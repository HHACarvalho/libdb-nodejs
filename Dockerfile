# Use the latest Node.js alpine runtime image
FROM node:alpine AS build_application
WORKDIR /app/

# Copy the project files
COPY ./ ./

# Install all dependencies
RUN npm install

# Build the application
RUN npm run build

# Use the latest Node.js alpine runtime image
FROM node:alpine AS build_dependencies
WORKDIR /app/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Use the latest Node.js alpine runtime image
FROM node:alpine AS runtime
WORKDIR /app/

# Copy the published application, .env file, package.json and production dependencies
COPY --from=build_application /app/build/ ./
COPY --from=build_application /app/.env /app/src/
COPY --from=build_dependencies /app/package.json ./
COPY --from=build_dependencies /app/node_modules/ ./node_modules/

# Expose the port the app runs on
EXPOSE 5000

# Launch the application
WORKDIR /app/src/
ENTRYPOINT ["node", "app.js"]