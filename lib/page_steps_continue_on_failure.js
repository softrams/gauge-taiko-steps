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

step("Verify  <element> text is <elementText>",
        {continueOnFailure: true}, async (element, elementText) => {
    elementText = helpers.getValue(elementText);
    gauge.message("Verifying " + element + " text contains " + elementText);

    await taiko.waitFor(element + ' did not contain text ' + elementText,
        async () => (await (await getPageElement(taiko, element)).text()).toString()
        .replaceAll("\\s+", " ")
        .replaceAll("\n", " ")
        .includes(elementText))
});
