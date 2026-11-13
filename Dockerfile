FROM nginx:alpine

# Default listening port inside container
ENV PORT=3001

# Copy nginx config template (processed by envsubst automatically on startup)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy static assets to nginx document root
COPY . /usr/share/nginx/html

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
