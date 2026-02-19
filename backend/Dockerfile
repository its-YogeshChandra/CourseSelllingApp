# ---- Build Stage ----
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# ---- Production Stage ----
FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# ffmpeg is needed by fluent-ffmpeg for video processing
RUN apk add --no-cache ffmpeg

WORKDIR /app

# Copy dependency files and install production-only deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy source code from builder (avoids carrying over devDeps node_modules)
COPY --from=builder /app/src ./src

# Create required directories for file uploads and processing
RUN mkdir -p ./public/temp ./public/chunkPlaylist

# Expose the backend port (default 8080)
EXPOSE 8080

# Start the server
CMD ["node", "-r", "dotenv/config", "--experimental-json-modules", "src/index.js"]
