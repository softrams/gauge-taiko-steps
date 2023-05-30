/* globals gauge*/
"use strict";
const taiko = require("taiko");
const path = require("path");

const headless = process.env.headless_chrome || 'true';
const browser_for_each_scenario = process.env.browser_for_each_scenario;
const open_browser_after_test = process.env.open_browser_after_test;

// Support to run inside docker
const docker_env = process.env.DOCKER_RUNTIME || 'false';
const docker_args = ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote'];

let addl_browser_args = process.env.browser_args ? process.env.browser_args.split(',') : [];
const browser_args = docker_env === 'true' ? docker_args.concat(addl_browser_args) : addl_browser_args;

beforeSuite(async () => {
  if (!browser_for_each_scenario || browser_for_each_scenario === 'false') {
    await taiko.openBrowser({ headless: headless === 'true', args: browser_args});
    taiko.setConfig({
      navigationTimeout: Number((process.env.navigation_timeout || taiko.getConfig("navigationTimeout"))),
      retryInterval: Number((process.env.retry_interval || taiko.getConfig("retryInterval"))),
      retryTimeout: Number((process.env.retry_timeout || taiko.getConfig("retryTimeout"))),
      // waitForEvents: (process.env.wait_for_events.split(",") || taiko.getConfig("waitForEvents"))
    });
  }
  console.log("navigationTimeout => - " + taiko.getConfig("navigationTimeout"));
  console.log("retryInterval => - " + taiko.getConfig("retryInterval"));
  console.log("retryTimeout => - " + taiko.getConfig("retryTimeout"));
  console.log("waitForEvents1 => - " + taiko.getConfig("waitForEvents"));
  console.log("waitForEvents2 => - " + process.env.wait_for_events.split(","));
});

beforeScenario(async () => {
  if (browser_for_each_scenario === "true") {
    await taiko.openBrowser({
      headless: headless === 'true',
      args: browser_args
    });
  }
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

afterScenario(async () => {
  await gauge.screenshot();
  if (browser_for_each_scenario === "true") {
    await taiko.closeBrowser();
  }
});

afterSuite(async () => {
  if (!open_browser_after_test || open_browser_after_test === 'false') {
    await taiko.closeBrowser();
  }
});

gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(process.env["gauge_screenshots_dir"], `screenshot-${process.hrtime.bigint()}.png`);
  await taiko.screenshot({ path: screenshotFilePath, fullPage: false });
  return path.basename(screenshotFilePath);
};
