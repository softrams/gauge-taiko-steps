/* globals gauge*/
"use strict";
const taiko = require("taiko");
const assert = require("assert");
const selectors = require("./_selectors");
const helpers = require("./_helpers");

step("Goto <url>", async url => {
  const response = await taiko.goto(`${process.env.APP_ROOT_URL}${url}`);
  assert.strictEqual(response.status.code, 200);
});

step("Check <eleType> with text <text> exists", async (eleType, text) => {
  const ele = await selectors.getElementBySelector(eleType, text);
  assert.strictEqual(await ele.exists(), true);
});

step("Select <value> from dropDown <dropDown>", async (value, dropDown) => {  
  var ele;
  
  try { ele = await taiko.dropDown(dropDown);}
  catch(e){}

  ele = await taiko.dropDown(taiko.near(dropDown));
  await ele.select(value);
});

step("Click <text>", async (text) => {
  await taiko.click(text);
});

step("Check text <text> exists", async text => {
  const ele = await selectors.getElementBySelector("text", text);
  assert.strictEqual(await ele.exists(), true);
});

step("Click <eleType> with text <text>", async (eleType, text) => {
  await taiko.click(await selectors.getElementBySelector(eleType, text));
});

step("Click <eleType> closer <proximity> text <text>", async (eleType, proximity, text) => {
  await taiko.click(await selectors.getElementBySelector(eleType, await selectors.getProximitySelector(proximity,text)));
});

step("Write <text> into <textbox>", async (text, textbox) => {
  await taiko.write(text, taiko.into(taiko.textBox(helpers.parseString(textbox))));
});

step("Write <text> into dateField with text <textbox>", async (text, textbox) => {
  await taiko.write(text, taiko.into(taiko.timeField(helpers.parseString(textbox))));
});

step(
  "Check <eleType> with text <text> matches <regex>",
  async (eleType, text, regex) => {
    const ele = await selectors.getElementBySelector(eleType, text);
    const selText = await ele.text();
    const matches = selText.match(new RegExp(regex, "gm"));
    assert.strictEqual(matches.length > 0, true);
  }
);

step(
  "Check <eleType> with text <text> and value <idx> matching <regex> to be <val>",
  async (eleType, text, idx, regex, val) => {
    const ele = await selectors.getElementBySelector(eleType, text);
    const selText = await ele.text();
    const matches = selText.match(new RegExp(regex, "gm"));
    assert.strictEqual(matches.length > 0, true);
    const valMatches = selText.match(/\s[0-9]*\s/gm).map(x => x.trim());
    assert.strictEqual(valMatches[idx - 1] === val, true);
  }
);

step("Wait <milliseconds>ms", async (milliseconds) => {
  await taiko.waitFor(milliseconds);
});

step("Wait for <text>", async (text) => {
  await taiko.waitFor(text);
});

