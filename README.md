# TNFSHSU

Made with [Astro](https://astro.build) and [PayloadCMS](https://payloadcms.com), based on [Astroad](https://github.com/mooxl/astroad).

## Prerequisites

Before getting started this repo, make sure you have the necessary software installed:

- Docker
- Node.js (with npm)

## Configuration

__🚧 UNDER CONSTRUCTION 🚧__

Just copy `.env.example` to `.env` for now. No other configuration needed.

## Getting started

To get started with this repo, you'll need to have Docker and NPM (or other managers) installed on your machine.

1. Clone this repo: `git clone https://github.com/tnfshcec/tnfshsu.git`
2. Change into the repository directory: `cd tnfshsu`
3. Start the containers: `npm run dev`
4. To develop locally, you need to install the dependencies manually: `npm install`

This will start up the Astro, Payloadcms and Mongo containers and make them available on your local machine. Astro will be served at http://localhost:4321 and the Payload will be available at http://localhost:3001.

## Development

The `docker-compose.yml` and `docker-compose-dev.yml` files includes everything you need to run the containers. The containers use the environment variables declared in the `.env` file and mounted volumes to store data persistently even after the containers are stopped and started.
