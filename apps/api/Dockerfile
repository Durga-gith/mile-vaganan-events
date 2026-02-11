FROM node:20-alpine

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy the entire repository
COPY . .

# Install dependencies from the root
RUN npm install

# Debug: List files to confirm schema existence (will show in logs)
RUN ls -R apps/api/prisma

# Generate Prisma Client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build the API
RUN npm run build --workspace=api

# Expose port and start command
EXPOSE 3001
CMD ["node", "apps/api/dist/main"]
