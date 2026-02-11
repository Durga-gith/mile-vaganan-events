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
# This finds it whether we are in root or in apps/api
RUN PRISMA_SCHEMA=$(find . -name "schema.prisma" | head -n 1) && \
    echo "Found schema at: $PRISMA_SCHEMA" && \
    npx prisma generate --schema=$PRISMA_SCHEMA

# Build the API
# We try both root-style and local-style build
RUN npm run build --workspace=api || (cd apps/api && npm run build) || npm run build

# Expose port
EXPOSE 3001

# Start command - adjusted for potential path differences
CMD ["sh", "-c", "node apps/api/dist/main || node dist/main"]
