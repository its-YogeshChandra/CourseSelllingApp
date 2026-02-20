# ---- Build Stage ----
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy source code and config
COPY . .

# Build arguments for Vite env vars (injected at build time)
ARG VITE_LOGIN_USER
ARG VITE_SIGNUP_USER
ARG VITE_GOOGLE_USER
ARG VITE_AUTHME_URL
ARG VITE_COURSE_URL
ARG VITE_LESSON_URL
ARG VITE_GETCOURSE_URL
ARG VITE_GETCOURSE_LESSONS_URL
ARG VITE_ISPRESENT_URL
ARG VITE_ADDSUBSCRIPTION_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_COURSE_ADDTOCOMPLETION_URL
ARG VITE_COURSE_CHECKCOMPLETION_URL
ARG VITE_FINDUSER_URL
ARG VITE_UPDATEPASSWORD_URL
ARG VITE_UPDATEPROFILE_URL
ARG VITE_LOGOUT_USER

# Build the Vite app (env vars are baked into the static bundle)
RUN pnpm run build

# ---- Production Stage ----
# Serve built static files with a lightweight nginx image
FROM nginx:stable-alpine

# Remove default nginx content and recreate the directory
RUN rm -rf /usr/share/nginx/html && mkdir -p /usr/share/nginx/html

# Copy built frontend assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
