/* globals gauge */
"use strict";

const { $ } = require('taiko');
const { getFileContent } = require("./fileReader");

async function getPageElement(element) {
    let elementText;
    if (element.includes("with text")) {
        const elementParts = element.split("with text");
        element = elementParts[0].trim();
        elementText = elementParts[1].trim();
    }

    const currentPageName = gauge.dataStore.scenarioStore.get("currentPageName");
    let fileText = await getFileContent("./tests/pages/" + currentPageName + ".json");
    let fileObject;
    let hasElement;
    if (fileText == null) {
        fileText = await getFileContent("./tests/pages/common.json");
        fileObject = JSON.parse(fileText);
        hasElement = fileObject.hasOwnProperty(element);
    }

    fileObject = JSON.parse(fileText);
    hasElement = fileObject.hasOwnProperty(element);
    if (!hasElement) {
        fileText = await getFileContent("./tests/pages/common.json");
        fileObject = JSON.parse(fileText);
        hasElement = fileObject.hasOwnProperty(element);
    } else {
        let elementLocatorValue = fileObject[element]
        elementLocatorValue = elementText ?
            elementLocatorValue.replace("{text}", elementText) : elementLocatorValue;
        return $(elementLocatorValue);
    }

    return element;
}

module.exports = {
    getPageElement
}
