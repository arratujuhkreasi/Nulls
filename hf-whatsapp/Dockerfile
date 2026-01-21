FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY apps/web/package*.json ./
RUN npm install

# Copy necessary source code
COPY apps/web/lib ./lib
COPY apps/web/scripts ./scripts
COPY apps/web/app/actions ./app/actions
COPY apps/web/utils ./utils
COPY apps/web/tsconfig.json ./tsconfig.json

# Install tsx globally for running TypeScript
RUN npm install -g tsx

# Environment
ENV NODE_ENV=production
ENV PORT=7860

# Expose HuggingFace default port
EXPOSE 7860

# Start WhatsApp bot
CMD ["tsx", "scripts/start-whatsapp.ts"]
