FROM node:19
WORKDIR /usr/programming-takes
COPY . .
RUN npm install
CMD ["npm", "start"]
