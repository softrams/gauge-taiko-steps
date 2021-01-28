# Gauge Taiko Steps

Implements gauge steps for Taiko API, so that tests can be directly written without having to implement
steps for most common scenarios.

## How to use it

Install this npm package to your Gauge js project.

```bash
# npm
npm i @softrams/gauge-taiko-steps

# yarn
yarn add @softrams/gauge-taiko-steps
```

And update STEP_IMPL_DIR in \<gauge-project-root\>/env/default/js.properties to include
steps implementation from this package.

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

- Write "05/08/2020" into dateField with text "{\"placeholder\":\"Filter by Created Date\"}"
- Click "button" closer "toRightOf" text "Entity Information"

## Test your application for accessibility (a11y)
Use one of the two steps below to check the accessbility of the page. Both steps perform the same action.
- Audit page for accessibility
- Check accessibility for the page

Executing either of these steps will output a score in a range of 0 to 100, along with a set of violations in your gauge report.

### Environment properties to support accessibility (a11y) check
You can fine tune the a11y check by using the following properties. To use these properties, add them in the `<gauge-project-root>/env/default/default.properties` file.

**Set the accessbility score threshold for a page**

You can set a minimum threshold for the a11y score. If the page scores lower than the threshold the scenario fails. As an example, the following statement sets it to 90. Default value is 80.

```zsh
# Set the value of minimum desired accessibility (a11y) score
min_accessibility_score = 90
```

**Continue scenario even if accessiblity minimum score is not met**

You can control whether your test scenario should continue if the a11y check of the page fails, as defined by minimum score property. As an example, the following statement will keep the scenario running even if minimum score is not met. Default value is false.

```zsh
# Set to true if you want to continue the scenario if accessibility (a11y) check fails
continue_on_accessibility_fail = true
```

## Related projects

- Add Data Integrity checks to your tests cases with Gauge Steps (https://github.com/softrams/gauge-taiko-steps-mysql)

## Thanks to these amazing projects

- Gauge Framework (https://gauge.org/)
- Taiko (https://taiko.dev/)
