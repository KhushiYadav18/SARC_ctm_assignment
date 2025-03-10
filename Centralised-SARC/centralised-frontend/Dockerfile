# Dockerfile (Frontend)
FROM node:18-alpine

WORKDIR /app

# Copy the package.json and package-lock.json first for caching
COPY package*.json ./

# Clear npm cache and install dependencies without cache issues
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Check if react-scripts is properly installed
RUN npm list react-scripts

# Copy the rest of the application code
COPY . .

# Fix permissions before build
RUN chmod -R 777 /app/node_modules/.bin && npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
