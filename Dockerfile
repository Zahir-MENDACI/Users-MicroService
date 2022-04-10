FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install

# Bundle app source
COPY . .

RUN tsc
# If you are building your code for production
# RUN npm ci --only=production



EXPOSE 6060
CMD [ "node", "dist/app.js" ]