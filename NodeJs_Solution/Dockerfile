FROM  node:18.20

WORKDIR /app

COPY package*.json ./

RUN npm install 

RUN npm install -g nodemon

COPY . .

EXPOSE 19980

CMD ["nodemon", "dist/app.js"]




