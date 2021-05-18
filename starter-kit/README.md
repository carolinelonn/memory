# Schmemory starter kit

This starter kit includes Jest, Babel, Sass, and webpack to hopefully help with reducing the time
spent on boilerplate stuff.

_If you are interested in using a simple server to produce images for your cards, you can look in
the sub-folder [example-image-server](./example-image-server)._

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or newer)

## Development

First install dependencies:

```sh
npm install
```

### Running in development mode

To start the project in development mode:

```sh
npm start
```

### Testing

To run unit tests:

```sh
npm test
```

## Deployment

To create a production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npx http-serve dist
```
