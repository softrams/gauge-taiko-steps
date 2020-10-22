# Gauge Taiko Steps

Implements gauge steps for Taiko API, so that tests can be directly written without having to implement
steps for most common scenarios.

## How to use it

Installl this npm package to your Gauge js project.

```bash
# npm
npm i @softrams/gauge-taiko-steps

# yarn
yarn add @softrams/gauge-taiko-steps
```

And update STEP_IMPL_DIR in /env/default/js.properties to include
steps implemenation from this package.

```bash
STEP_IMPL_DIR = tests,node_modules/@softrams/gauge-taiko-steps/lib
```

## Related projects

- Add Data Integrity checks to your tests cases with Gauge Steps (https://github.com/softrams/gauge-taiko-steps-mysql)

## Thanks to these amazing projects

- Gauge Framework (https://gauge.org/)
- Taiko (https://taiko.dev/)
