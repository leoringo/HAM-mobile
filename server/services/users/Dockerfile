# based image yang akan digunakan
FROM node:16.13

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/app

# untuk set ENV dalam aplikasi kita
ENV DATABASE_URI=mongodb+srv://AmoreRingo:V80Y880Z1ZqiW6SS@cluster0.lrccofy.mongodb.net/?retryWrites=true&w=majority
ENV PORT=4001

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