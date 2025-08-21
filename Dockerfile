# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose port 10000 (Render's default)
EXPOSE 10000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=10000
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "start"]