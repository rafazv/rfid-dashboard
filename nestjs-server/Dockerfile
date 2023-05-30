### STAGE 1: Preparation ###
FROM node:16.13-alpine AS preparation

COPY package.json package-lock.json ./
# Create temporary package.json where version is set to 0.0.0
# This way the cache of the build step won't be invalidated if only the version changed.
RUN ["node", "-e", "\
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));\
    const pkgLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf-8'));\
    fs.writeFileSync('package.json', JSON.stringify({ ...pkg, version: '0.0.0' }));\
    fs.writeFileSync('package-lock.json', JSON.stringify({ ...pkgLock, version: '0.0.0' }));\
    "]

### STAGE 2: Builder ###
FROM node:16.13-alpine AS builder

RUN mkdir /app

WORKDIR /app

# Depends on the server ("Error: could not get uid/gid")
# RUN npm config set unsafe-perm true

# Add package.json before rest of repo for caching
COPY --from=preparation package.json package-lock.json /app/

RUN npm install --silent --progress=false

COPY . /app

RUN npm run build

### STAGE 2: Runner ###
FROM node:16.13-alpine AS Runner

RUN mkdir /app

WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/

CMD ["npm", "run", "start:prod"]
