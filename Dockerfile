FROM node:lts-buster
RUN apt-get update && apt-get install -y git ffmpeg imagemagick
WORKDIR /root/suho-md
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]
