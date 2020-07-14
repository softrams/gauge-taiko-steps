/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");

beforeSuite(async () => {
  console.log(`APP_ROOT_URL: ${process.env.APP_ROOT_URL}`);
  console.log(`API_ROOT_URL: ${process.env.API_ROOT_URL}`);
  await taiko.openBrowser({ headless: true });
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

// gauge.screenshotFn = async function () {
//   return await taiko.screenshot({ encoding: "base64" });
// };

gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(
    process.env["gauge_screenshots_dir"],
    `screenshot-${process.hrtime.bigint()}.png`
  );
  await taiko.screenshot({ path: screenshotFilePath, fullPage: false });
  return path.basename(screenshotFilePath);
};
