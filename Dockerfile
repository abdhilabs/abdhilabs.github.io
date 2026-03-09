# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Umami analytics (public values, embedded at build time)
ARG REACT_APP_UMAMI_URL
ARG REACT_APP_UMAMI_WEBSITE_ID
ENV REACT_APP_UMAMI_URL=$REACT_APP_UMAMI_URL
ENV REACT_APP_UMAMI_WEBSITE_ID=$REACT_APP_UMAMI_WEBSITE_ID

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .
RUN yarn build

# --- runtime stage ---
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN printf '%s\n' \
'server {' \
'  listen 80;' \
'  server_name _;' \
'  root /usr/share/nginx/html;' \
'  index index.html;' \
'  location / {' \
'    try_files $uri $uri/ /index.html;' \
'  }' \
'}' \
> /etc/nginx/conf.d/default.conf