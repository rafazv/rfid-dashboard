# RFID Dashboard

It's a project to monitoring registered RFID's.

Check the [client](./client/README.md) and [server](./server/README.md) folder, each with its README for build and run

## Tech Stack

- [Angular](https://angular.io/): Reponsive framework for building single-page client applications using HTML and TypeScript;
- [Nest.js](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable and scalable server-side applications;

## Development

After install and setup client and server you can run (root folder):

```bash
npm start
```

This command will start [client](http://localhost:4200) and [server](http://localhost:3000) on development mode.

## Production/Homologation

We've setup a [docker-compose file](./docker-compose.yml) for build and run.

[Traefik](https://doc.traefik.io/traefik/) is the responsible for route all requests. We've configured Traefik using docker labels, so if you need to change ports and host rules, update the respective labels and entrypoints.

For setup all environment, run:

```bash
docker-compose up -d --build
```