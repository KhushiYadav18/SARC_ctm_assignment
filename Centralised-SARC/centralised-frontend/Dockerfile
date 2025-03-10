# Dockerfile (Frontend)
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Check if react-scripts is properly installed
RUN npx react-scripts --version

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
