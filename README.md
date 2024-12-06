# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

# Development Setup

## Prerequisites

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/

## Option 1: Develop inside a Docker container

1. Run `docker compose up` in the root of this project. This will build an image and start a container with the fastify running, along with supporting service containers (i.e. Postgres db). Project files are mapped from the local filesystem into the container filesystem so that changes can be detected.

2. To install new dependencies or run commands, "log in" to the running container with the exec command: `docker compose exec server bash -l`. Use CTRL-D or `exit` to exit the container.

## Option 2: Develop locally, using only supporting services running in Docker containers

1. Run `docker compose -f compose.yml up`. This will only run the supporting service containers (i.e. Postgres db).

2. Copy `example.env` to `.env` file and modify as needed.

3. Continue to develop and run the application code locally on your host operating system.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).
