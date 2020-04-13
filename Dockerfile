############################################################
# Dockerfile to build aio-cli-plugin-aep image to run inside a docker container.
# Based on Node. Requires npm to be pre-installed.
############################################################

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

#To run the image in container: docker run -it --rm -v ~/.config:/root/.config aio-cli-plugin-aep -s



