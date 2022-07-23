FROM nginx:1.23
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/vhosts.d/fraudbusters-ui.conf
