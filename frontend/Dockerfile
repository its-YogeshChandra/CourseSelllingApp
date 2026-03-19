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
FROM node:20-alpine AS production

# Install a lightweight static file server (npm comes with node, no extra setup)
RUN npm install -g serve

WORKDIR /app

COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "dist", "-l", "3000", "-s"]
