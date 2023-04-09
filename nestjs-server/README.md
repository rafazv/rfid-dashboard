<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

This is the API of RFID Dashboard built with the Nest framework.

## Before You Begin

Before you begin check and install the basic building blocks that assemble this application:

- [Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- [Node.js](https://nodejs.org/en/download/) - Install with npm packager.
- [Nest](https://docs.nestjs.com/) - Node.js framework repository.
- Docker - We're going to use the [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) to setup the production and dev environment.

## Installation

```bash
$ npm install
$ npm install -g ts-node
$ docker-compose -f ./database.docker-compose.yml up -d
```

The last command will setup our Postgres database on port 5436. You can change to the default 5432 if you want, just update docker-compose and .env file.

We are using [TypeORM](https://typeorm.io/#/) to connect and manage the database migrations. All migrations run automatically after starting the server.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The application runs on port 3000.

## Migration

We are using [TypeORM](https://typeorm.io/#/) to manage all migrations. For each entity change run:

```bash
$ npm run typeorm:migrate MigrationName
```

This will update the migrations folder.

## Documentation

### Swagger

For API documentantion this project uses [Swagger](https://swagger.io/). On development mode you can check http://localhost:3000/api

We have also generated swagger.json file, wich you can check on [Swagger UI](https://editor.swagger.io/).

### Postman

[Postman](https://www.postman.com/) is an API platform for building and using APIs. Import test/api.postman_collection.json to test and check the API.
