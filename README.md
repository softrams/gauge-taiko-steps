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
STEP_IMPL_DIR = node_modules/@softrams/gauge-taiko-steps/lib, \
                tests
```

And that's it. Start writing tests. You can check all available steps in the lib folder.
Here is a sample test showing some of the steps available

## Sample Test Scenario

- Emulate device "iPad Pro landscape"
- Emulate network "Good3G"
- Emulate timezone "America/New_York"
- Set screen size as width "1600" height "900"

- Goto "/"

- Check "link" with text "Link Text" exists
- Check "button" with text "FAQs" exists

- Write "hello" into "search"

- Select "value" from dropDown "dropdown"

- Click "button" with text "Click Me"
- Save screenshot

## Test for Accessibility

- Audit page for accessibility

## Related projects

- Add Data Integrity checks to your tests cases with Gauge Steps (https://github.com/softrams/gauge-taiko-steps-mysql)

## Thanks to these amazing projects

- Gauge Framework (https://gauge.org/)
- Taiko (https://taiko.dev/)
