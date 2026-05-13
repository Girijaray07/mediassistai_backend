FROM python:3.11-slim

# Install system build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Change to working Directory
WORKDIR /app

# Install uv
RUN pip install --no-cache-dir uv

# Copy dependency files first
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen --no-dev

# Copy all project files
COPY . .

# Expose the port from docker container to 
EXPOSE 8000

CMD [".venv/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]