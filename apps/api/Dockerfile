FROM node:20-alpine

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy everything
COPY . .

# Check where we are and where the files are
RUN ls -la

# Install dependencies
RUN npm install

# Find the prisma schema and generate client
# We provide a dummy DATABASE_URL during build time to satisfy Prisma's validation
RUN PRISMA_SCHEMA=$(find . -name "schema.prisma" | head -n 1) && \
    echo "Found schema at: $PRISMA_SCHEMA" && \
    DATABASE_URL="mongodb://localhost:27017/dummy" npx prisma generate --schema=$PRISMA_SCHEMA

# Build the API
RUN DATABASE_URL="mongodb://localhost:27017/dummy" npm run build --workspace=api || \
    (cd apps/api && DATABASE_URL="mongodb://localhost:27017/dummy" npm run build) || \
    DATABASE_URL="mongodb://localhost:27017/dummy" npm run build

# Expose port
EXPOSE 3001

# Start command - runs database sync then starts the server
CMD ["sh", "-c", "PRISMA_SCHEMA=$(find . -name \"schema.prisma\" | head -n 1) && npx prisma db push --schema=$PRISMA_SCHEMA --accept-data-loss && (node apps/api/dist/main || node dist/main)"]
