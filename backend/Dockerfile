# Use an official Node runtime as the base image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install dependencies at the root level
RUN npm install

# Change the working directory to the backend directory
WORKDIR /app/backend

# Install any additional dependencies needed for the backend
RUN npm install

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run the app when the container launches
CMD ["yarn", "start"]