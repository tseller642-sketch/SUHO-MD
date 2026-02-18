FROM node:20

RUN apt-get update && apt-get install -y \
    git \
    ffmpeg \
    imagemagick \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root/suho-md
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]
