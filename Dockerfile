FROM node  
MAINTAINER Sinogear Group

ENV HTTP_PORT 8000

COPY . /app  
WORKDIR /app

EXPOSE 8000
EXPOSE 3004

ENTRYPOINT npm run dev-mock
