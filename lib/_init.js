/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");

const headless = process.env.headless_chrome || 'true';

// Support to run inside docker
const docker_env = process.env.DOCKER_RUNTIME || 'false';
const docker_args = ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote'];

let addl_browser_args = process.env.browser_args ? process.env.browser_args.split(',') : [];
const browser_args = docker_env === 'true' ? docker_args.concat(addl_browser_args) : addl_browser_args;

beforeSuite(async () => {
  await taiko.openBrowser({
    headless: headless === 'true',
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--window-size=1440,900',
    ]
  });
  // await taiko.openBrowser({ headless: headless === 'true', args: browser_args});
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
  const screenshotFilePath = path.join(process.env["gauge_screenshots_dir"],
    `screenshot-${process.hrtime.bigint()}.png`
  );
  await taiko.screenshot({ path: screenshotFilePath, fullPage: false });
  return path.basename(screenshotFilePath);
};
