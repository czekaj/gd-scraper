FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
ADD www /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html