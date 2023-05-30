### STAGE 1: Preparation ###
FROM node:16.13-slim AS preparation

COPY package.json package-lock.json ./
# Create temporary package.json where version is set to 0.0.0
# This way the cache of the build step won't be invalidated if only the version changed.
RUN ["node", "-e", "\
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));\
    const pkgLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf-8'));\
    fs.writeFileSync('package.json', JSON.stringify({ ...pkg, version: '0.0.0' }));\
    fs.writeFileSync('package-lock.json', JSON.stringify({ ...pkgLock, version: '0.0.0' }));\
    "]

### STAGE 2: Build ###
FROM node:16.13-slim AS builder

RUN mkdir /rfid-dashboard-app

WORKDIR /rfid-dashboard-app

# Add package.json before rest of repo for caching
COPY --from=preparation package.json package-lock.json /rfid-dashboard-app/

RUN npm install --silent --progress=false

COPY . /rfid-dashboard-app

RUN npm run build

### STAGE 3: Setup ###
FROM nginx:1.20.2-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /rfid-dashboard-app/dist/angular-client /usr/share/nginx/html
COPY --from=builder /rfid-dashboard-app/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
