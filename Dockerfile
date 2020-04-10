FROM node:12


#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#
#RUN npm install
#
#COPY . .

RUN npm install -g @adobe/aio-cli

RUN npm install -g @adobe/aio-cli-plugin-aep

RUN aio plugins:install @adobe/aio-cli-plugin-aep

CMD [ "aio", "aep", "--help" ]

#docker build -t bgaurav/aio-cli-plugin-aep
#docker run -it --entrypoint /bin/bash bgaurav/aio-cli-plugin-aep -s


