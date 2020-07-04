/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");

beforeSuite(async () => {
  console.log(`APP_ROOT_URL: ${process.env.APP_ROOT_URL}`);
  await taiko.openBrowser({ headless: true });
});

afterSuite(async () => {
  await taiko.closeBrowser();
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
