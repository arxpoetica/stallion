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


