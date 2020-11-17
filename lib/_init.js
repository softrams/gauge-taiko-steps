/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");

const headless = process.env.headless_chrome || 'true';

beforeSuite(async () => {
  await taiko.openBrowser({ headless: headless === 'true'});
});

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
