/* globals gauge */
"use strict";
const taiko = require("taiko");
const assert = require("assert");
const { getPageElement } = require("./_pageElement");

step(["I  verify <element> <elementState>", "I  verify <element> is <elementState>"],
    {continueOnFailure: true}, async (element, elementState) => {
    const pageElement = await getPageElement(taiko, element);
    switch (elementState) {
        case "exist":
            await taiko.waitFor(async () => (pageElement.exists()))
            break;
        case "displayed":
        case "visible":
            if (pageElement === element) {
                await taiko.waitFor(pageElement)
            } else {
                await taiko.waitFor(async () => (pageElement.isVisible()))
            }
            break;
        case "not exist":
            await taiko.waitFor(async () => !(pageElement.exists()))
            break;
        case "not displayed":
        case "not visible":
            await taiko.waitFor(async () => !(pageElement.isVisible()))
            break;
        default:
            assert.fail("Element state \"" + elementState + "\" undefined")
    }
});

step("I  verify <element> text is <elementText>",
    {continueOnFailure: true}, async (element, elementText) => {
    await taiko.waitFor(element + ' did not contain text ' + elementText,
        async () => (await (await getPageElement(taiko, element)).text()).toString()
        .replaceAll("\\s+", " ")
        .replaceAll("\n", " ")
        .includes(elementText))
})
