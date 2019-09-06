FROM node:10.16.0
WORKDIR /app
COPY . ./
RUN npm install
CMD ["npm", "start"]