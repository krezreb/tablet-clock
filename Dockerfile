FROM nginx

RUN mkdir -p /src
ADD . /src

ADD ./nginx.conf /etc/nginx/nginx.conf

