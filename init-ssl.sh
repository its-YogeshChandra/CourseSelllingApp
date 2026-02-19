#!/bin/bash
# ============================================================
# SSL Certificate Setup Script
# Run this ONCE on your server to obtain the initial SSL cert
# ============================================================
# Usage:
#   chmod +x init-ssl.sh
#   ./init-ssl.sh yourdomain.com your@email.com
# ============================================================

set -e

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
  echo "Usage: ./init-ssl.sh <domain> <email>"
  echo "Example: ./init-ssl.sh example.com admin@example.com"
  exit 1
fi

echo "============================================"
echo "  SSL Setup for: $DOMAIN"
echo "============================================"

# Step 1: Replace placeholder domain in nginx config
echo "[1/4] Updating nginx config with domain: $DOMAIN"
sed -i "s/yourdomain.com/$DOMAIN/g" nginx/nginx.conf
sed -i "s/yourdomain.com/$DOMAIN/g" docker-compose.yml

# Step 2: Create a temporary nginx config (HTTP only) for cert issuance
echo "[2/4] Creating temporary HTTP-only nginx config..."
cat > nginx/nginx.tmp.conf << 'EOF'
server {
    listen 80;
    server_name DOMAIN_PLACEHOLDER;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'SSL setup in progress...';
        add_header Content-Type text/plain;
    }
}
EOF
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" nginx/nginx.tmp.conf

# Swap in the temp config
cp nginx/nginx.conf nginx/nginx.conf.bak
cp nginx/nginx.tmp.conf nginx/nginx.conf

# Step 3: Start nginx with HTTP-only config
echo "[3/4] Starting nginx for certificate issuance..."
docker compose up -d nginx

# Wait for nginx to be ready
sleep 5

# Step 4: Request the certificate
echo "[4/4] Requesting SSL certificate from Let's Encrypt..."
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

# Restore the full nginx config (with SSL)
echo "Restoring full nginx config..."
cp nginx/nginx.conf.bak nginx/nginx.conf
rm nginx/nginx.tmp.conf nginx/nginx.conf.bak

# Restart everything
echo "Starting all services..."
docker compose down
docker compose up -d

echo ""
echo "============================================"
echo "  SSL setup complete!"
echo "  Your app is live at: https://$DOMAIN"
echo "  Certbot will auto-renew certificates."
echo "============================================"
