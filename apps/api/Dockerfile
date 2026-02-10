FROM node:20-alpine AS builder

WORKDIR /app

# Copy root files
COPY package.json ./

# Create directory structure
RUN mkdir -p apps/api

# Copy workspace package.jsons
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build API
RUN npm run build --workspace=apps/api

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["node", "apps/api/dist/main"]
