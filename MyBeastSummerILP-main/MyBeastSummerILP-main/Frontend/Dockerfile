# Use the official Node.js image as base
FROM node:20.0.0 as build

# Create and set the working directory
WORKDIR /frontend_ilp_winter

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock /frontend_ilp_winter/

# Install dependencies
RUN yarn install

# Copy the frontend project files to the container
COPY . /frontend_ilp_winter/

# Build the frontend app
RUN yarn build

# Use a lightweight web server to serve the built frontend app
RUN yarn global add serve

# Command to serve the built app
CMD ["serve", "-s", "build", "-l", "5016"]
