# 🧠 MediAssist AI Backend

MediAssist AI Backend is a modern AI-powered healthcare backend system built using FastAPI, Gemini AI, OpenRouter/Ollama fallback models, and Supabase PostgreSQL.

It provides:

* AI-powered healthcare responses
* Real-time streaming chat APIs
<!-- * Authentication system -->
* Persistent conversations
* Medical condition retrieval
* Ayurvedic supplement recommendations
* Multi-agent AI routing
* Production-ready deployment architecture

---

# 🌐 Related Repositories

## Frontend Repository

👉 https://github.com/Girijaray07/mediassistai_frontend

---

# 🚀 Features

* ⚡ Real-time streaming AI responses
* 🧠 Gemini AI integration
* 🔄 OpenRouter/Ollama fallback system
* 🏥 Medical condition retrieval layer
* 💊 Ayurvedic supplement recommendations
<!-- * 🔐 JWT authentication -->
* 💾 Persistent conversations
<!-- * ☁️ Multi-device conversation syncing -->
* 🧩 Modular backend architecture
* 🐳 Docker support
* 🌍 Production-ready infrastructure

---

# 🏗️ Tech Stack

## Backend Framework

* FastAPI
* Python 3.11+

## AI Systems

* Gemini
* OpenRouter
* Ollama

## Database

* Supabase PostgreSQL

<!-- ## Authentication

* JWT Tokens
* Passlib / Bcrypt -->

## Infrastructure

* Docker
* AWS EC2
* NGINX
* HTTPS SSL

---

# 🧠 System Architecture

```text
Client Request
      ↓
FastAPI API Layer
      ↓
Authentication Layer
      ↓
Medical Retrieval Layer
      ↓
AI Agent Router
 ├── Gemini
 ├── OpenRouter
 └── Ollama
      ↓
Streaming Response
      ↓
Supabase PostgreSQL
```

---

# 📂 Project Structure

```text
backend/
│
├── api/                # API routes
├── core/               # Config, agents, security
├── db/                 # Database session handling
├── schemas/            # Pydantic models
├── services/           # Business logic
├── scripts/            # Seeder and utilities
├── data/               # CSV datasets
├── main.py             # FastAPI entry point
├── requirements.txt
└── .env
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Girijaray07/mediassistai_backend.git

cd mediassistai_backend
```

---

# 🐍 Create Virtual Environment

```bash
python -m venv .venv
```

Activate environment:

### Linux / macOS

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

---

# 📦 Install Dependencies

```bash
uv sync
```

---

# 🔑 Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=
OPENROUTER_API_KEY=
DATABASE_URL=
<!-- JWT_SECRET_KEY= -->
<!-- ACCESS_TOKEN_EXPIRE_MINUTES=60 -->
```

---

# 🚀 Run Development Server

```bash
uv run poe dev
```

Backend runs on:

```text
http://localhost:8000
```

---

# 📘 API Documentation

FastAPI automatically provides Swagger docs:

## Swagger UI

```text
http://localhost:8000/docs
```

## ReDoc

```text
http://localhost:8000/redoc
```

---

# 🔄 AI Response Flow

```text
User Query
     ↓
Medical Retrieval System
     ↓
Gemini AI
     ↓
Fallback:
OpenRouter / Ollama
     ↓
Streaming Response
```

---

# 🏥 Medical Retrieval System

The backend includes a lightweight Retrieval-Augmented Generation (RAG) pipeline.

Features:

* Medical condition detection
* Fuzzy matching using RapidFuzz
* Ayurvedic supplement retrieval
* Structured medical recommendations

Example Flow:

```text
User:
"I have allergic rhinitis"

↓

Detect Condition:
allergic-rhinitis

↓

Fetch Supplements:
- Astragalus
- Black seed
- Bromelain
- Guduchi
```

<!-- ---

# 🔐 Authentication

Authentication system includes:

* User signup
* User login
* JWT token generation
* Protected routes
* Persistent sessions
* Multi-device account access -->

---

# 💬 Persistent Conversations

Conversation system supports:

<!-- * Session-based chats -->
<!-- * Conversation history -->
* Database-backed messages
* User-specific conversations
<!-- * Cross-device synchronization -->

---

# 📡 Streaming Responses

Streaming responses are implemented using:

* FastAPI StreamingResponse
* Async generators
* Token/chunk streaming
* Real-time frontend updates

---

# 🐳 Docker Support

Dockerized backend support is included for production deployments.

---

# 🚀 Deployment Guide

Detailed production deployment guide:

👉 [DEPLOYMENT.md](./DEPLOYMENT.md)

Includes:

* Docker deployment
* AWS EC2 setup
* NGINX reverse proxy
* HTTPS SSL configuration
* Domain & DNS setup
* PM2 process management
* Production infrastructure architecture

---

# 🌐 Production API

👉 [https://api.mediassistai.girijaray.dev](https://api.mediassistai.girijaray.dev)

---

# 🧠 Future Improvements

* Vector database integration
* AI memory system
* Semantic medical search
* Voice assistant support
* Redis caching
* Kubernetes deployment
* CI/CD pipelines
* Medical report analysis
* AI voice conversations

---

# 👨‍💻 Author

Girija Shankar Ray

Built with modern AI backend engineering practices.