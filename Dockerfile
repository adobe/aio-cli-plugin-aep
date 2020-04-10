FROM node:12


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g @adobe/aio-cli

RUN npm install -g @adobe/aio-cli-plugin-aep

RUN aio plugins:install @adobe/aio-cli-plugin-aep

ENTRYPOINT ["/bin/bash"]

CMD [ "aio", "aep", "--help" ]



