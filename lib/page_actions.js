/* globals gauge*/
"use strict";
const taiko = require("taiko");
const assert = require("assert");
const selectors = require("./_selectors");

beforeSuite(async () => {
  await taiko.openBrowser();
});

afterSuite(async () => {
  await taiko.closeBrowser();
});

gauge.screenshotFn = async function () {
  return await taiko.screenshot({ encoding: "base64" });
};

step("goto <url>", async url => {
  const response = await taiko.goto(url);
  assert.equal(response.status.code, 200);
});

step("click <eleType> <text>", async (eleType, text) => {
  const ele = selectors.getElementBySelector(eleType, text);
  if (ele) {
    await taiko.click(ele);
  } else {
    assert.fail("Invalid selector");
  }
});
