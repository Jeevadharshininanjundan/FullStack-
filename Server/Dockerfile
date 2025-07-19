# Use an official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port your dev server runs on (adjust if needed)
EXPOSE 5000

# Run the dev server
CMD ["npm", "run", "dev"]
