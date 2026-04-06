# Stage 1: Build the code
FROM  node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build-time arguments for environment variables
ARG VITE_APP_API_BASE_URL
ARG VITE_WEB3FORM_ACCESS_KEY
ARG VITE_CLOUDINARY_CLOUD_NAME

# Make them available for Vite build
ENV VITE_APP_API_BASE_URL=$VITE_APP_API_BASE_URL
ENV VITE_WEB3FORM_ACCESS_KEY=$VITE_WEB3FORM_ACCESS_KEY
ENV VITE_CLOUDINARY_CLOUD_NAME=$VITE_CLOUDINARY_CLOUD_NAME

# Build the application
RUN yarn build


# --------------------------------------------------------
# Stage 2 - PRODUCTION STAGE (Nginx)
FROM nginx:stable-alpine

# Copy built dist folder from builder stage to Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (standard HTTP)
EXPOSE 80

# Nginx runs in the foreground by default with this base image
CMD ["nginx", "-g", "daemon off;"]