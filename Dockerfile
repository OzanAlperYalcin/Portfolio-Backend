FROM node:14-slim
WORKDIR .
COPY . .
RUN npm install
EXPOSE 4000
CMD ["npm", "run", "prod"]