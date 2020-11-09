/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");

/**
 *  Get headless option from env file
 */
const headless = process.env.headless_chrome.toLowerCase() === "true";

/**
 *  Get browser arguments form env file
 */
const browser_args = process.env.browser_args;

/**
 *  If there are no headless option and browser arguments are given in the env file, taiko will open browser with default values.
 */
if (browser_args && headless) {
  beforeSuite(async () => {
    await taiko.openBrowser({ headless: headless, args: [browser_args] });
  });
} else {
  beforeSuite(async () => {
    await taiko.openBrowser({});
  });
}

afterSuite(async () => {
  await taiko.closeBrowser();
});

afterStep(async () => {
  if (process.env.screenshot_on_everystep === "true") {
    const currentURL = await taiko.currentURL();
    if (!currentURL || currentURL !== "about:blank") {
      gauge.message(`URL:${currentURL}`);
      await gauge.screenshot();
    }
  }
});

gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(
    process.env["gauge_screenshots_dir"],
    `screenshot-${process.hrtime.bigint()}.png`
  );
  await taiko.screenshot({ path: screenshotFilePath, fullPage: false });
  return path.basename(screenshotFilePath);
};
