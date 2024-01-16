# Dockerfile
FROM node:18.18.0

# Set working directory
WORKDIR /app

# Copy frontend and backend code
COPY frontend /app/frontend
COPY backend /app/backend

# Install and build frontend
WORKDIR /app/frontend
RUN npm i
RUN npm run build

# Install backend dependencies and start the app
WORKDIR /app/backend
RUN npm i
CMD ["npm", "start"]
