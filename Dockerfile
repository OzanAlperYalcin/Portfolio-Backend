FROM node:18-alpine
WORKDIR .
COPY . .
RUN npm install
EXPOSE 4000
CMD ["npm", "run", "prod"]