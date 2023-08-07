# based image yang akan digunakan
FROM node:16.13

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/app

# untuk set ENV dalam aplikasi kita
ENV REDIS_PASSWORD=j9FGDKVpgKWlZ5dPm7dhPOpAxhttevAc
ENV REDIS_URL=redis-10326.c274.us-east-1-3.ec2.cloud.redislabs.com
ENV REDIS_PORT=10326
ENV PORT=80
ENV BASE_URL_APP=http://app-service:4002
ENV BASE_URL_USER=http://users-service:4001

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /usr/local/app/

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force

# 2 install setup for development
RUN npm install -g nodemon

# copy semua file & folder ke WORKDIR
COPY ./ ./

# execute apps: production
CMD ["npm", "run", "start"]