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
#   - DNS A/AAAA records pointing to this server
#   - Docker & Docker Compose installed
#   - Port 80 free (no other web server running)
#   - nginx/nginx.conf = HTTP-only config (default)
#   - nginx/nginx.ssl.conf = SSL template with "yourdomain.com" placeholders
# ============================================================

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

# Get server IPs (both IPv4 and IPv6)
SERVER_IPv4=$(curl -4 -s --connect-timeout 5 ifconfig.me 2>/dev/null || echo "none")
SERVER_IPv6=$(curl -6 -s --connect-timeout 5 ifconfig.me 2>/dev/null || echo "none")

# Get DNS records
DNS_A=$(dig +short "$DOMAIN" A | head -1)
DNS_AAAA=$(dig +short "$DOMAIN" AAAA | head -1)

echo "  Server IPv4: $SERVER_IPv4"
echo "  Server IPv6: $SERVER_IPv6"
echo "  DNS A:       ${DNS_A:-not set}"
echo "  DNS AAAA:    ${DNS_AAAA:-not set}"

# Check if at least one record matches
DNS_OK=false
if [ "$SERVER_IPv4" != "none" ] && [ "$SERVER_IPv4" = "$DNS_A" ]; then
  DNS_OK=true
fi
if [ "$SERVER_IPv6" != "none" ] && [ "$SERVER_IPv6" = "$DNS_AAAA" ]; then
  DNS_OK=true
fi

if [ "$DNS_OK" = false ]; then
  echo ""
  echo "  ⚠️  WARNING: No DNS record matches this server's IP!"
  echo "  If using IPv4 → add an A record pointing to $SERVER_IPv4"
  echo "  If using IPv6 → add an AAAA record pointing to $SERVER_IPv6"
  read -p "  Continue anyway? (y/N) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
else
  echo "  ✅ DNS is correctly configured"
fi

# Step 2: Start nginx + backend + frontend with HTTP-only config
# (nginx.conf is already the HTTP-only version by default)
echo "[2/5] Starting services with HTTP-only config..."
docker compose up -d nginx backend frontend

# Wait for nginx to be ready
echo "  Waiting for nginx to start..."
sleep 5

# Verify nginx is responding
if ! curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200\|301\|302"; then
  echo ""
  echo "  ❌ ERROR: Nginx is not responding on port 80!"
  echo "  Check logs with: docker compose logs nginx"
  echo "  Leaving services running with HTTP-only config."
  exit 1
fi
echo "  ✅ Nginx is responding on port 80"

# Step 3: Request the SSL certificate via Certbot
# NOTE: --entrypoint is needed because docker-compose.yml sets certbot's
# entrypoint to a renewal loop. We override it here to run certonly instead.
echo "[3/5] Requesting SSL certificate from Let's Encrypt..."
if ! docker compose run --rm --entrypoint "certbot" certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"; then

  echo ""
  echo "  ❌ ERROR: Certbot failed to obtain SSL certificate!"
  echo ""
  echo "  Common causes:"
  echo "    1. DNS not pointing to this server (check A/AAAA records)"
  echo "    2. Port 80 is blocked by a firewall"
  echo "    3. Too many certificate requests (rate limited)"
  echo "    4. Domain not registered or expired"
  echo ""
  echo "  Your site is still running on HTTP (no SSL)."
  echo "  Fix the issue above and re-run this script."
  echo ""
  exit 1
fi

echo "  ✅ SSL certificate obtained successfully"

# Step 4: Replace domain placeholders in SSL config and activate it
echo "[4/5] Activating SSL nginx config..."

# Create the production SSL config from the template
sed "s/yourdomain.com/$DOMAIN/g" nginx/nginx.ssl.conf > nginx/nginx.conf

# Also update the ALLOWED_ORIGINS in docker-compose.yml
sed -i.bak "s/yourdomain.com/$DOMAIN/g" docker-compose.yml
rm -f docker-compose.yml.bak

echo "  ✅ SSL config activated for $DOMAIN"

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
