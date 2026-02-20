# 🔒 SSL Setup Cheat Sheet — Raw Nginx + Certbot (No Script)

Manual step-by-step guide to configure SSL using Nginx and Let's Encrypt Certbot.

---

## 📋 Prerequisites

- A server with Docker & Docker Compose
- A domain with A/AAAA records pointing to your server
- Ports 80 and 443 open (firewall + cloud security group)

```bash
# Verify DNS is pointing correctly
dig yourdomain.com A +short        # Should return your server IPv4
dig yourdomain.com AAAA +short     # Should return your server IPv6 (if applicable)

# Verify ports are open
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## Step 1 — Start With HTTP-Only Nginx Config

Certbot needs nginx running on port 80 to verify domain ownership.
SSL config will crash if cert files don't exist yet, so start HTTP-only.

**`nginx/nginx.conf`** (initial — no SSL):
```nginx
server {
    listen 80;
    listen [::]:80;                              # IPv6 support
    server_name yourdomain.com www.yourdomain.com;

    # Certbot places challenge files here
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Temporary — serves a basic response
    location / {
        return 200 'Waiting for SSL setup...';
        add_header Content-Type text/plain;
    }
}
```

---

## Step 2 — Start Nginx

```bash
docker compose up -d nginx
```

Verify it's responding:
```bash
curl http://yourdomain.com/.well-known/acme-challenge/test
# Should return 404 (means nginx is routing to /var/www/certbot — correct)
```

---

## Step 3 — Obtain SSL Certificate

```bash
docker compose run --rm \
  --entrypoint "certbot" \
  certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your@email.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com \
  -d www.yourdomain.com
```

> ⚠️ **`--entrypoint "certbot"` is critical** if your docker-compose.yml has a
> custom entrypoint for the certbot service. Without it, the container runs
> `certbot renew` instead of `certbot certonly`.

**On success you'll see:**
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/yourdomain.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

**Verify certs exist:**
```bash
docker compose run --rm --entrypoint "certbot" certbot certificates
```

---

## Step 4 — Switch to SSL Nginx Config

Now replace `nginx/nginx.conf` with the full SSL version:

```nginx
# --- HTTP: redirect to HTTPS + handle ACME challenges ---
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# --- HTTPS: main server ---
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    # ----- SSL Certificates -----
    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # ----- TLS Settings -----
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # ----- Security Headers -----
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # ----- Reverse Proxy: API -----
    location /api/ {
        proxy_pass http://backend:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 50M;
    }

    # ----- Reverse Proxy: Frontend -----
    location / {
        proxy_pass http://frontend:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Key points:**
- `listen [::]:80` and `listen [::]:443 ssl` → required for IPv6
- `ssl_certificate` → points to file inside the `certbot_conf` Docker volume
- `return 301 https://...` → forces all HTTP traffic to HTTPS

---

## Step 5 — Restart Everything

```bash
docker compose down
docker compose up -d
```

**Verify:**
```bash
curl -I https://yourdomain.com
# Should return HTTP/2 200 with security headers
```

---

## 🔄 Certificate Renewal

Let's Encrypt certs expire after **90 days**. The certbot container auto-renews.

**Manual renewal:**
```bash
docker compose run --rm --entrypoint "certbot" certbot renew
docker compose restart nginx     # Nginx needs restart to pick up new certs
```

**Check expiry:**
```bash
docker compose run --rm --entrypoint "certbot" certbot certificates
```

---

## 🐛 Troubleshooting Cheat Sheet

| Problem | Cause | Fix |
|---|---|---|
| `certbot` says "No renewals attempted" | Custom entrypoint in docker-compose runs `renew` instead of `certonly` | Add `--entrypoint "certbot"` to the docker command |
| `exit code: 255` during build | Platform mismatch (arm64 vs amd64) | Remove `platform: linux/arm64` from docker-compose.yml |
| `address already in use :80` | Another service on port 80 | `sudo lsof -i :80` → stop the conflicting service |
| Browser can't load but `curl` works | Browser forces HTTPS, no cert yet | Get SSL first, or type `http://` explicitly |
| Nginx crashes after enabling SSL | Cert files don't exist | Run certbot (Step 3) before switching to SSL config |
| Site unreachable | DNS A record missing (only AAAA set) | Add A record for IPv4 — most users are IPv4-only |
| `cannot load certificate` in nginx logs | Wrong path or certs not mounted | Check `certbot_conf` volume is mounted to `/etc/letsencrypt` |

---

## 📚 Key Concepts

### DNS Record Types
```
A    record → maps domain to IPv4  (e.g. 46.123.45.67)
AAAA record → maps domain to IPv6  (e.g. 2a01:4f8:c17:6454::1)
```
Always set both if your server has both IPs.

### SSL Certificate Files
```
fullchain.pem  → Your cert + intermediate certs (used by nginx)
privkey.pem    → Your private key (used by nginx)
cert.pem       → Your cert only
chain.pem      → Intermediate certs only
```

### Nginx Listen Directives
```nginx
listen 80;              # IPv4 only
listen [::]:80;         # IPv6 only
# Use BOTH for dual-stack support
```

### Certbot Commands
```bash
certbot certonly   → Obtain a new certificate (first time)
certbot renew      → Renew existing certificates
certbot certificates → List all certificates and expiry dates
certbot revoke     → Revoke a certificate
```

---

## ⚡ Quick Reference (Copy-Paste Ready)

```bash
# ===== OBTAIN INITIAL CERT =====
docker compose up -d nginx                              # 1. Start nginx (HTTP-only config)
docker compose run --rm --entrypoint "certbot" \        # 2. Get cert
  certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email you@email.com --agree-tos --no-eff-email \
  -d yourdomain.com -d www.yourdomain.com
# 3. Edit nginx/nginx.conf → paste SSL config from Step 4
docker compose down && docker compose up -d             # 4. Restart with SSL

# ===== RENEW CERT =====
docker compose run --rm --entrypoint "certbot" certbot renew
docker compose restart nginx

# ===== CHECK CERT STATUS =====
docker compose run --rm --entrypoint "certbot" certbot certificates

# ===== DEBUG =====
docker compose logs -f nginx
docker compose exec nginx nginx -t                      # Test nginx config syntax
curl -vI https://yourdomain.com                         # Verbose SSL check
openssl s_client -connect yourdomain.com:443            # Inspect SSL cert directly
```
