FROM node:alpine
MAINTAINER Paolo Casciello <paolo.casciello@scalebox.it>

# dev webserver port
EXPOSE 8000
EXPOSE 35729

WORKDIR /workspace

COPY ./package.json /workspace/
COPY ./gulpfile.js /workspace/
COPY ./.eslintrc.json /workspace/

ENV NODE_ENV development

RUN npm install gulp -g
RUN npm install

CMD ["gulp", "monitor"]
