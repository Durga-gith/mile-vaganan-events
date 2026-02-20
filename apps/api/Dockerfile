FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY . .

RUN ls -la

RUN npm install

# Generate Prisma Client explicitly from the API schema
RUN cd apps/api && DATABASE_URL="mongodb://localhost:27017/dummy" npx prisma generate --schema=prisma/schema.prisma

RUN DATABASE_URL="mongodb://localhost:27017/dummy" npm run build --workspace=api || \
    (cd apps/api && DATABASE_URL="mongodb://localhost:27017/dummy" npm run build) || \
    DATABASE_URL="mongodb://localhost:27017/dummy" npm run build

EXPOSE 3001

# Run db push and start the API using the API schema only
CMD ["sh", "-c", "cd apps/api && npx prisma db push --schema=prisma/schema.prisma --accept-data-loss && node dist/main"]
