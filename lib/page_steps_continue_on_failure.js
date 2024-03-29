/* globals gauge */
"use strict";
const taiko = require("taiko");
const helpers = require("./_helpers");
const { getPageElement, checkElementState } = require("./_pageElement");

step(["Verify  <element> <elementState>", "Verify  <element> is <elementState>"],
        {continueOnFailure: true}, async (element, elementState) => {
    element = helpers.getValue(element);
    gauge.message("Verifying " + element + " to be " + elementState);
    await checkElementState(taiko, element, elementState);
});

step(["Verify  <element> <elementText> <elementState>", "Verify  <element> <elementText> is <elementState>"],
        {continueOnFailure: true}, async (element, elementText, elementState) => {
  element = element + " with text " + helpers.getValue(elementText);
  await checkElementState(taiko, element, elementState);
});

step("Verify  <element> text is <elementText>", 
        {continueOnFailure: true}, async (element, elementText) => {
    elementText = helpers.getValue(elementText);
    gauge.message("Verifying " + element + " text contains " + elementText);

    await taiko.waitFor(async () => (await (await getPageElement(taiko, element)).text()).toString()
        .replaceAll("\\s+", " ")
        .replaceAll("\n", " ")
        .includes(elementText))
});
