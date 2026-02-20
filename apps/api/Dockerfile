FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY . .

RUN ls -la

RUN npm install

ARG PRISMA_SCHEMA_PATH=apps/api/prisma/schema.prisma
RUN echo "Using schema at: $PRISMA_SCHEMA_PATH" && \
    DATABASE_URL="mongodb://localhost:27017/dummy" npx prisma generate --schema=$PRISMA_SCHEMA_PATH

RUN DATABASE_URL="mongodb://localhost:27017/dummy" npm run build --workspace=api || \
    (cd apps/api && DATABASE_URL="mongodb://localhost:27017/dummy" npm run build) || \
    DATABASE_URL="mongodb://localhost:27017/dummy" npm run build

EXPOSE 3001

CMD ["sh", "-c", "PRISMA_SCHEMA_PATH=apps/api/prisma/schema.prisma; if [ ! -f \"$PRISMA_SCHEMA_PATH\" ]; then PRISMA_SCHEMA_PATH=prisma/schema.prisma; fi; echo Using schema: $PRISMA_SCHEMA_PATH; npx prisma db push --schema=$PRISMA_SCHEMA_PATH --accept-data-loss && (node apps/api/dist/main || node dist/main)"]
