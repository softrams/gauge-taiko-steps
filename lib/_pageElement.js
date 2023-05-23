/* globals gauge */
"use strict";

// const { $ } = require("taiko");
const taiko = require("taiko");
const { readFile } = require("fs/promises");
const fs = require('fs');

const helpers = [ "evaluate", "to", "into", "accept", "dismiss", "setConfig", "getConfig", "waitFor", "repl" ];
const selectors = [ "$", "image", "link", "listItem", "button", "fileField", "timeField", "textBox", "dropDown", "checkBox", "radioButton", "text", "tableCell", "color", "range" ];
const proximitySelectors = [ "toLeftOf", "toRightOf", "above", "below", "near", "within" ];

const getHelper = async element => {
    if (helpers.some(helper => element.startsWith(helper))) {
        const helperValue = element.trim().substring(0, element.indexOf(" "));
        const elementValue = element.trim().substring(element.indexOf(" ") + 1);
        const selector = await getSelector(elementValue);

        console.log("1==> " + helperValue);
        console.log("2==> " + elementValue);
        console.log("3==> " + selector);

        switch (helperValue) {
            case "evaluate":
                return await taiko.evaluate(selector);
            case "to":
                return await taiko.to(selector);
            case "into":
                return await taiko.into(selector);
            case "accept":
                return await taiko.accept(selector);
            case "dismiss":
                return await taiko.dismiss(selector);
            case "setConfig":
                return taiko.setConfig(selector);
            case "getConfig":
                return await taiko.getConfig(selector);
            case "waitFor":
                return await taiko.waitFor(selector);
            case "repl":
                return await taiko.repl(selector);
            default:
                break;
        }
    }
    return element;
}

const getSelector = async element => {
    if (selectors.some(selector => element.startsWith(selector))) {
        const helperValue = element.trim().substring(0, element.indexOf(" "));
        const elementValue = element.trim().substring(element.indexOf(" ") + 1);

        console.log("4==> " + helperValue);
        console.log("5==> " + elementValue);

        switch (helperValue) {
            case "$":
                return taiko.$(elementValue);
            case "image":
                return taiko.image(elementValue);
            case "link":
                return taiko.link(elementValue);
            case "listItem":
                return taiko.listItem(elementValue);
            case "button":
                return taiko.button(elementValue);
            case "fileField":
                return taiko.fileField(elementValue);
            case "timeField":
                return taiko.timeField(elementValue);
            case "textBox":
                return taiko.textBox(elementValue);
            case "dropDown":
                return taiko.dropDown(elementValue);
            case "checkBox":
                return taiko.checkBox(elementValue);
            case "radioButton":
                return taiko.radioButton(elementValue);
            case "text":
                return taiko.text(elementValue);
            case "tableCell":
                return taiko.tableCell(elementValue);
            case "color":
                return taiko.color(elementValue);
            case "range":
                return taiko.range(elementValue);
            default:
                break;
        }
    }
    return element;
}

exports.getPageElement = async (taiko, element) => {
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
        return await $(elementLocatorValue);
    }

    return element;
}

async function getFileContent(path) {
    return fs.existsSync(path) ? await readFile(path, 'utf8') : null;
}

// module.exports = {
//     getPageElement
// }
