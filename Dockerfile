# Use the official Node.js image as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build your TypeScript code
RUN npm run build

# Expose the port your app is running on
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
