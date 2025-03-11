# Dockerfile (Frontend)
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Check if react-scripts is properly installed
RUN npm list react-scripts

# Copy the rest of the application code
COPY . .

# Build the React application
RUN chmod -R 777 /app/node_modules/.bin && npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
