# 🚀 MediAssist AI — Production Grade Deployment

## 🌐 Live API

🔗 https://api.mediassistai.girijaray.dev

---

# 🧠 About The Project

MediAssist AI is an AI-powered medical assistant backend built using FastAPI, Docker, AWS EC2, NGINX, and HTTPS SSL encryption.

This deployment was designed with real-world production architecture principles including:

- 🐳 Containerization with Docker
- 🔥 Reverse Proxy using NGINX
- ☁️ Cloud Hosting on AWS EC2
- 🔐 Secure HTTPS with Let's Encrypt SSL
- 🌍 Custom Domain & DNS Management
- 🔄 Automatic SSL Renewal
- 🏗️ Production Routing Architecture

---

# 🏗️ Production Architecture

```text
Internet
   ↓
HTTPS (SSL/TLS)
   ↓
NGINX Reverse Proxy
   ↓
Docker Container
   ↓
FastAPI Backend
```

---

# ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend Language |
| FastAPI | High-performance API framework |
| Docker | Containerization |
| AWS EC2 | Cloud Hosting |
| NGINX | Reverse Proxy & SSL Termination |
| Certbot | SSL Automation |
| Let's Encrypt | Free SSL Certificates |
| Name.com | Domain & DNS Management |
| Supabase PostgreSQL | Database |
| Gemini API | AI Model Integration |

---

# 🐳 Step 1 — Containerizing the Backend with Docker

The backend was fully containerized using Docker to ensure:

- ✅ Consistent environments
- ✅ Easy deployment
- ✅ Portability
- ✅ Dependency isolation
- ✅ Production-ready scalability

## 📦 Dockerfile

```dockerfile
FROM python:3-slim

EXPOSE 8000

RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir uv

WORKDIR /app

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen

COPY . .

CMD ["uv", "run", "poe", "dev"]
```

---

# ☁️ Step 2 — Deploying to AWS EC2

An Ubuntu EC2 instance was launched on AWS to host the backend.

## 🚀 Why AWS EC2?

- Full server control
- Scalable cloud infrastructure
- Public IP hosting
- Real-world deployment environment

This transformed the backend from a local development environment into a publicly accessible cloud-hosted API.

---

# 📦 Step 3 — Running Docker in Production

The Docker container was deployed on EC2 using:

```bash
sudo docker run -d \
--restart unless-stopped \
-p 8000:8000 \
--env-file .env \
--name mediassist \
girijaraj64/mediassistai_backend:latest
```

## ✅ Benefits

- Automatic restart on server reboot
- Environment variable isolation
- Background execution
- Stable production container

---

# 🌐 Step 4 — Domain & DNS Configuration

A custom domain was configured using Name.com.

## 🌍 Domain Structure

```text
Frontend  → mediassistai.girijaray.dev
Backend   → api.mediassistai.girijaray.dev
```

## 📌 DNS Setup

An A Record was created pointing the subdomain to the AWS EC2 public IP.

| Type | Host | Value |
|---|---|---|
| A | api.mediassistai | `<EC2 Public IP>` |

---

# 🧩 Step 5 — Solving Real DNS Propagation Issues

During deployment, multiple real-world DNS issues were encountered and resolved:

- ❌ Mixed Nameserver Conflicts
- ❌ Vercel DNS interference
- ❌ DNS propagation delays
- ❌ Split authoritative DNS
- ❌ SSL verification failures

## 🔧 Final Fix

The domain was migrated completely to Name.com nameservers:

```text
ns1.name.com
ns2.name.com
ns3.name.com
ns4.name.com
```

This ensured:

- ✅ Consistent DNS Resolution
- ✅ Stable SSL Validation
- ✅ Proper Global Routing

This was one of the most valuable real-world infrastructure debugging experiences during the deployment process.

---

# 🔥 Step 6 — Configuring NGINX Reverse Proxy

NGINX was configured as a reverse proxy to forward traffic to the FastAPI Docker container.

## ⚡ Why NGINX?

NGINX acts as a production-grade traffic manager that:

- Handles HTTPS traffic
- Proxies requests to the backend
- Improves security
- Enables scalable architecture
- Separates public traffic from internal services

## 🧠 NGINX Configuration

```nginx
server {
    listen 80;

    server_name api.mediassistai.girijaray.dev;

    location / {
        proxy_pass http://127.0.0.1:8000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

# 🔐 Step 7 — Enabling HTTPS with SSL Certificates

HTTPS was enabled using:

- Certbot
- Let's Encrypt
- NGINX SSL Integration

## 🔒 SSL Setup Command

```bash
sudo certbot --nginx -d api.mediassistai.girijaray.dev
```

## ✅ What This Achieved

- HTTPS Encryption
- Browser Trust
- Secure API Communication
- Automatic HTTP → HTTPS Redirect
- Automatic SSL Renewal

---

# 🔄 Automatic SSL Renewal

Certbot automatically schedules certificate renewals.

This ensures the backend remains secure without manual intervention.

## 🔍 Renewal Verification

```bash
systemctl list-timers | grep certbot
```

---

# 🛡️ Security Improvements

## 🔥 AWS Security Groups

Only the required ports were exposed publicly:

| Port | Purpose |
|---|---|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |

Port `8000` was kept internal behind NGINX for improved security.

---

# 🚀 Production Features Achieved

- ✅ Dockerized Backend
- ✅ Cloud Deployment
- ✅ Reverse Proxy Architecture
- ✅ HTTPS Encryption
- ✅ Automatic SSL Renewal
- ✅ Custom Domain Integration
- ✅ Public API Hosting
- ✅ DNS Management
- ✅ Production Networking
- ✅ Real-world Infrastructure Setup

---

# 🧠 Key Learnings From This Deployment

This deployment involved solving real production engineering problems including:

- Docker networking
- Reverse proxy architecture
- TLS/SSL certificate management
- DNS propagation
- Nameserver conflicts
- Cloud server configuration
- Public API hosting
- Infrastructure debugging
- NGINX reverse proxy setup
- HTTPS deployment
- Production-grade backend architecture

---

# 📌 API Endpoint

```text
https://api.mediassistai.girijaray.dev
```

---

# 🎯 Future Improvements

- CI/CD Pipeline
- Kubernetes Deployment
- Redis Caching
- Load Balancing
- Monitoring & Logging
- Authentication System
- Rate Limiting
- Frontend Deployment
- IPv6 Support

---

# 💡 Final Note

This project was not just about deploying a backend.

It was about building and understanding a real-world production infrastructure stack from scratch — solving networking, DNS, SSL, cloud deployment, and containerization challenges along the way.

This deployment represents a complete production-grade backend architecture built using modern DevOps and backend engineering practices.

---

# 🏁 Deployment Status

✅ Production Backend Deployed  
✅ HTTPS Enabled  
✅ Public API Accessible  
✅ SSL Certificates Active  
✅ Dockerized Infrastructure Running  
✅ Cloud Hosted on AWS EC2  

🚀 MediAssist AI is now running as a secure production-grade backend service.