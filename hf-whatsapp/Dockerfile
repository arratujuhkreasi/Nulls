FROM node:18-alpine

WORKDIR /app

# Install git (required for some npm packages)
RUN apk add --no-cache git

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy necessary source code (files are in root, not in apps/web/)
COPY lib ./lib
COPY scripts ./scripts
COPY app ./app
COPY utils ./utils

# Install tsx globally for running TypeScript
RUN npm install -g tsx

# Environment
ENV NODE_ENV=production
ENV PORT=7860

# Expose HuggingFace default port
EXPOSE 7860

# Start WhatsApp bot
CMD ["tsx", "scripts/start-whatsapp.ts"]
