FROM monostream/nodejs-gulp-bower
MAINTAINER Paolo Casciello <paolo.casciello@scalebox.it>

COPY ./package.json /workspace/
COPY ./gulpfile.js /workspace/
COPY ./.eslintrc.json /workspace/

ENV NODE_ENV development

RUN npm update

CMD ["gulp", "monitor"]
