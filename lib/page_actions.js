/* globals gauge*/
"use strict";
const taiko = require("taiko");
const assert = require("assert");
const selectors = require("./_selectors");

step("goto <url>", async (url) => {
  const response = await taiko.goto(`${process.env.APP_ROOT_URL}${url}`);
  assert.equal(response.status.code, 200);
});

step("check <eleType> with text <text> exists", async (eleType, text) => {
  const ele = await selectors.getElementBySelector(eleType, text);
  assert.equal(await ele.exists(), true);
});

step("check text <text> exists", async (text) => {
  const ele = await selectors.getElementBySelector("text", text);
  assert.equal(await ele.exists(), true);
});

step("click <eleType> with text <text>", async (eleType, text) => {
  await taiko.click(await selectors.getElementBySelector(eleType, text));
});

step("write <text> into <textbox>", async (text, textbox) => {
  await taiko.write(text, taiko.into(taiko.textBox(textbox)));
});
