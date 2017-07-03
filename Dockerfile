FROM node:alpine
MAINTAINER Paolo Casciello <paolo.casciello@scalebox.it>

WORKDIR /workspace

COPY ./package.json /workspace/
COPY ./gulpfile.js /workspace/
COPY ./.eslintrc.json /workspace/

ENV NODE_ENV development

RUN npm install gulp -g
RUN npm install

CMD ["gulp", "monitor"]
