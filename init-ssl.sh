#!/bin/bash
# ============================================================
# SSL Certificate Setup Script
# Run this ONCE on your server to obtain the initial SSL cert
# ============================================================
# Usage:
#   chmod +x init-ssl.sh
#   ./init-ssl.sh yourdomain.com your@email.com
#
# Prerequisites:
#   - DNS A records pointing to this server
#   - Docker & Docker Compose installed
#   - Port 80 free (no other web server running)
#   - nginx/nginx.conf = HTTP-only config (default)
#   - nginx/nginx.ssl.conf = SSL template with "yourdomain.com" placeholders
# ============================================================

set -e

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
  echo "Usage: ./init-ssl.sh <domain> <email>"
  echo "Example: ./init-ssl.sh example.com admin@example.com"
  exit 1
fi

echo ""
echo "============================================"
echo "  SSL Setup for: $DOMAIN"
echo "============================================"
echo ""

# Step 1: Verify DNS is pointing to this server
echo "[1/5] Verifying DNS for $DOMAIN..."
SERVER_IP=$(curl -s ifconfig.me)
DNS_IP=$(dig +short "$DOMAIN" | head -1)
if [ "$SERVER_IP" != "$DNS_IP" ]; then
  echo "  ⚠️  WARNING: DNS mismatch!"
  echo "  Server IP:  $SERVER_IP"
  echo "  DNS points: $DNS_IP"
  echo "  Make sure your A record points to $SERVER_IP"
  read -p "  Continue anyway? (y/N) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
else
  echo "  ✅ DNS is correctly pointing to $SERVER_IP"
fi

# Step 2: Start nginx + backend + frontend with HTTP-only config
# (nginx.conf is already the HTTP-only version by default)
echo "[2/5] Starting services with HTTP-only config..."
docker compose up -d nginx backend frontend

# Wait for nginx to be ready
echo "  Waiting for nginx to start..."
sleep 5

# Step 3: Request the SSL certificate via Certbot
echo "[3/5] Requesting SSL certificate from Let's Encrypt..."
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

# Step 4: Replace domain placeholders in SSL config and activate it
echo "[4/5] Activating SSL nginx config..."

# Create the production SSL config from the template
sed "s/yourdomain.com/$DOMAIN/g" nginx/nginx.ssl.conf > nginx/nginx.conf

# Also update the ALLOWED_ORIGINS in docker-compose.yml
sed -i.bak "s/yourdomain.com/$DOMAIN/g" docker-compose.yml
rm -f docker-compose.yml.bak

# Step 5: Restart everything with SSL
echo "[5/5] Restarting all services with SSL..."
docker compose down
docker compose up -d

echo ""
echo "============================================"
echo "  ✅ SSL setup complete!"
echo "  Your app is live at: https://$DOMAIN"
echo "  Certbot will auto-renew certificates."
echo "============================================"
echo ""
echo "  Useful commands:"
echo "    docker compose logs -f nginx     # check nginx logs"
echo "    docker compose logs -f backend   # check backend logs"
echo "    docker compose ps                # check all services"
echo ""
