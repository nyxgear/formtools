FROM node:alpine
MAINTAINER nyxgear <dev@nyxgear.com>

ENV NODE_ENV development

WORKDIR /workspace

# copy required files
COPY ./package.json /workspace/
COPY ./gulpfile.js /workspace/
COPY ./.eslintrc.json /workspace/

RUN npm install yarn --global
RUN yarn global add gulp

# install dependecies
RUN yarn install

# dev webserver port
EXPOSE 3000
EXPOSE 3001

# watch
CMD ["gulp", "monitor"]
