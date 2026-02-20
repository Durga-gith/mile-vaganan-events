FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl ca-certificates && update-ca-certificates

COPY . .

RUN ls -la

RUN npm install

# Generate Prisma Client using the correct schema path (root or apps/api)
RUN if [ -f "apps/api/prisma/schema.prisma" ]; then \
      SCHEMA="apps/api/prisma/schema.prisma"; \
    else \
      SCHEMA="prisma/schema.prisma"; \
    fi && \
    echo "Prisma generate using schema at: $SCHEMA" && \
    DATABASE_URL="mongodb://localhost:27017/dummy" npx prisma generate --schema="$SCHEMA"

# Build the API (support both monorepo root and apps/api contexts)
RUN DATABASE_URL="mongodb://localhost:27017/dummy" npm run build --workspace=api || \
    (test -d apps/api && cd apps/api && DATABASE_URL="mongodb://localhost:27017/dummy" npm run build) || \
    DATABASE_URL="mongodb://localhost:27017/dummy" npm run build

EXPOSE 3001

# Run db push and start the API (detect schema and dist paths)
CMD ["sh", "-c", "if [ -f apps/api/prisma/schema.prisma ]; then SCHEMA=apps/api/prisma/schema.prisma; DIST=apps/api/dist/main; else SCHEMA=prisma/schema.prisma; DIST=dist/main; fi; echo Using schema: $SCHEMA; npx prisma db push --schema=$SCHEMA --accept-data-loss && echo Starting server at $DIST on PORT=${PORT:-3001} && ls -la $(dirname $DIST) || true && node $DIST"]
