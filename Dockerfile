# Multi-stage build for Cars Application Backend
FROM node:22-alpine AS base

# ==========================================
# Stage 1: Install Backend Dependencies
# ==========================================
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY server/package.json server/package-lock.json* ./
RUN npm ci

# ==========================================
# Stage 2: Build Backend
# ==========================================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY server/ ./

# Set environment variables for build
ENV NODE_ENV production

# Build TypeScript
RUN npm run build

# ==========================================
# Stage 3: Production Runtime
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy necessary files
COPY --from=builder /app/package.json ./package.json

# Copy built application
COPY --from=builder --chown=expressjs:nodejs /app/dist ./dist
COPY --from=deps --chown=expressjs:nodejs /app/node_modules ./node_modules

USER expressjs

EXPOSE 3003

ENV PORT 3003
ENV HOSTNAME "0.0.0.0"

CMD ["node", "dist/index.js"]
