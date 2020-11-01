from node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY data.js .
COPY index.js .
CMD [ "node", "index.js" ]
