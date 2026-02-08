# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .
RUN yarn build

# --- server build stage ---
FROM node:20-alpine AS server-build
WORKDIR /app/server
COPY server/package.json server/package-lock.json* ./
RUN npm install --production

# --- runtime stage ---
FROM nginx:alpine

# Install node for API server
RUN apk add --no-cache nodejs npm

# Copy server
COPY --from=server-build /app/server /app/server
COPY --from=build /app/server/knowledge-base /app/server/knowledge-base

# Copy nginx config with API proxy
COPY --from=build /app/build /usr/share/nginx/html

RUN printf '%s\n' \
'server {' \
'  listen 80;' \
'  server_name _;' \
'  root /usr/share/nginx/html;' \
'  index index.html;' \
'' \
'  # API proxy to Express server' \
'  location /api {' \
'    proxy_pass http://127.0.0.1:3002;' \
'    proxy_http_version 1.1;' \
'    proxy_set_header Upgrade \$http_upgrade;' \
'    proxy_set_header Connection "upgrade";' \
'    proxy_set_header Host \$host;' \
'    proxy_set_header X-Real-IP \$remote_addr;' \
'    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;' \
'    proxy_set_header X-Forwarded-Proto \$scheme;' \
'    proxy_read_timeout 86400;' \
'  }' \
'' \
'  # SPA routing' \
'  location / {' \
'    try_files $uri $uri/ /index.html;' \
'  }' \
'}' \
> /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx and node server
CMD sh -c "node /app/server/index.js & nginx -g 'daemon off;'"