# Stallion

Stallion is a headless CMS built atop Svelte and Sapper.

![Stallion logo](./static/svg/logo-public.svg)

## Development

The following is a bunch of rambled thoughts that I wanted to make sure to record and not forget, but I'll come back to later and better organize.

### Environment Variables

Stallion uses `rollup-plugin-replace` for environment variable replacement. Any environment variable prefixed with `STALLION_` will automatically be replaced in the code if it's listed as a `process.env.*` variable. For example:

	process.env.STALLION_ARANGODB_CONNECTION

Is replaced with with the connection string.

`process.env.NODE_ENV` and `process.env.PORT` are the only non-prefixed variables to also be replaced.

### Install Prisma

Stallion uses [Prisma](https://www.prisma.io) for GraphQL endpoints and data management and migrations. (This is subject to change; in future versions of Stallion, GraphQL may all be internally managed.)

Install Prisma using NPM:

	npm install -g prisma

Prisma settings are located in the `prisma/prisma.yml` file. Open this file, uncomment line ... TODO: / FIXME: ...

<!-- TODO: decide how to handle Prisma changes and generation... -->

### Postgres

Stallion (via Prisma) requires a connection to a Postgres database (other databases are also possible with some settings tweaks.

