FROM node:alpine
ENV PATH = "./node_modules/.bin:$PATH"
WORKDIR /app
COPY . .
RUN npm install
CMD [ "npm", "start" ]
