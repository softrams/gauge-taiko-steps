# Gauge Taiko Steps

At Softrams, we believe that building great software solutions require a diverse, cross functional team with all hands on the deck.
One of the most important aspects, team focuses on is **end to end user journey tests** and acceptance tests.
To make sure everybody in the team be able to review and actively contribute to building user journey tests,
we need a testing framework that is **accessible** to everyone, irrespective of programming background.

This repository is an important step in that direction to make end to end tests and user journey tests accessible to everyone.
We chose Gauge, that allows writing tests in **plain** language. When needed, it allows enriching with additional contextual
documentation with simple markdown semantics.

In traditional tests, every step in a test scenario, need to be translated to an action that can be executed in the browser. This is often left to test automation engineers and developers. We chose to bridge that gap and tried to completely eliminate programming or development for each step.

This repository implements common gauge steps for Taiko API, so that tests can be created in plain language without
having to programmatically implement steps for most common scenarios. This means, anybody in the team can write
fully executable and verifiable test specifications, in plain language, without any additional programming or development needed.

> See a list of all available steps [here](./AvailableSteps.md).

We have also created a fully browser based environment for non-programmers to easily access test projects and environments to review,
contribute and run tests (without having to install and setup locally). This provides a docker container based environment with all test
tooling setup and opens VS Code inside browser. You may provision and run workspaces using these containers to offer a fully automated
browser based test environments.

> Check out https://github.com/softrams/automation-toolset for more.

## How to use it

Install this npm package to your Gauge js project.

```bash
# npm
npm i @softrams/gauge-taiko-steps

# yarn
yarn add @softrams/gauge-taiko-steps
```

And update _STEP_IMPL_DIR_ in `<gauge-project-root>/env/default/js.properties` to include
steps implementation from this package.

```bash
STEP_IMPL_DIR = node_modules/@softrams/gauge-taiko-steps/lib, \
                tests
```

### Environment Properties

Update environment properties in env/default/default.properties or if you have custom environments update in corresponding default.properties file.

All URLs are treated as relative to APP_ROOT_URL if specified. Otherwise, all URLs must be absolute (fully specified) URLs.

```bash
APP_ROOT_URL = <Your Application Root URL>
```

And that's it. Start writing tests. You can check all available steps in the lib folder.
Here is a sample test showing some of the steps available

### Sleep after every scenario

Sometimes you may want to pause after every scenario to allow for some cleanup or to reset the state of the application.
You can do this by setting the _sleep_after_scenario_ property in your env/default/default.properties file.
The value is in milliseconds. As an example, the following statement will pause for 5 seconds after every scenario.

```zsh
# Set the value of sleep after scenario in milliseconds
sleep_after_scenario = 5000
```

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

## Test your application for accessibility (a11y) at each step and interaction

Accessibility validation are done using axe library. By integrating this as part of this framework, it allows
to test for accessibility at each and every step (and interaction). This is great for dynamic, single page applications
that surface information based on user interactions.

Use one of the two steps below to check the accessbility of the page. Both steps perform the same action.

- Audit page for accessibility
- Check accessibility for the page

Executing either of these steps will output a score in a range of 0 to 100, along with a set of violations in your gauge report.
If the score for your page is less than 80 the scenario will fail. To change this read about the _min_accessibility_score_ property below.

Make sure to install taiko-accessibility plugin as well.

```bash
npm install --save-dev taiko-accessibility
```

### Environment properties to support accessibility (a11y) check

You can fine tune the a11y check by using the following properties. To use these properties, add them to the `<gauge-project-root>/env/default/default.properties`

**Set the accessbility score threshold for a page**

You can set a minimum threshold for the a11y score. If the page scores lower than the threshold the scenario fails. As an example, the following statement sets it to 90. Default value is 80.

```zsh
# Set the value of minimum desired accessibility (a11y) score
min_accessibility_score = 90
```

**Continue scenario even if accessiblity minimum score is not met**

You can control whether your test scenario should continue even if the a11y check of the page fails, as defined by minimum score property. As an example, the following statement will keep the scenario running even if minimum score is not met. Default value is false.

```zsh
# Set to true if you want to continue the scenario if accessibility (a11y) check fails
continue_on_accessibility_fail = true
```

# List of available Steps

Please see a list of all available steps [here](./AvailableSteps.md).

# Related projects

- Testing end to end user journey flows (https://www.userflow.dev/)
- Add Data Integrity checks to your tests cases with Gauge Steps (https://github.com/softrams/gauge-taiko-steps-mysql)

# Thanks to these amazing projects

- Gauge Framework (https://gauge.org/)
- Taiko (https://taiko.dev/)
