FROM node:20-alpine

WORKDIR /app

# Copy the entire repository
COPY . .

# Install dependencies from the root
RUN npm install

# Generate Prisma Client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build the API
RUN npm run build --workspace=api

# Expose port and start command
EXPOSE 3001
CMD ["node", "apps/api/dist/main"]
