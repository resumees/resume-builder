# Specify the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install dependencies at the root level
RUN npm install --legacy-peer-deps

# Change the working directory to the frontend directory
WORKDIR /app/frontend

# Install any additional dependencies needed for the frontend
RUN npm install --legacy-peer-deps

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]