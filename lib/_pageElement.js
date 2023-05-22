/* globals gauge */
"use strict";

const taiko = require("taiko");
const { readFile } = require("fs/promises");
const fs = require('fs');

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
        console.log("elementLocatorValue => " + elementLocatorValue);
        return taiko.$(elementLocatorValue);
    }

    return element;
}

async function getFileContent(path) {
    return fs.existsSync(path) ? await readFile(path, 'utf8') : null;
}

module.exports = {
    getPageElement
}
