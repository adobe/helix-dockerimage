FROM openwhisk/action-nodejs-v8

WORKDIR /nodejsAction

COPY package.json /nodejsAction/package.json

# Install wrap.js as container-provided helper
COPY wrap.js /nodejsAction/wrap.js

RUN rm -rf /nodejsAction/node_modules

RUN npm install \
    && npm cache clean --force

RUN cat /nodejsAction/package.json

EXPOSE 8080
CMD node --expose-gc app.js