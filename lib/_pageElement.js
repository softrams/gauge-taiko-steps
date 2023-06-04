/* globals gauge */
"use strict";

const { readFile } = require("fs/promises");
const fs = require('fs');
const _helpers = require("./_helpers");
const assert = require('assert').strict;

const helpers = [ "evaluate", "to", "into", "accept", "dismiss", "setConfig", "getConfig", "waitFor", "repl" ];
const selectors = [ "$", "image", "link", "listItem", "button", "fileField", "timeField", "textBox", "dropDown", "checkBox", "radioButton", "text", "tableCell", "color", "range" ];
const proximitySelectors = [ "toLeftOf", "toRightOf", "above", "below", "near", "within" ];

const getHelper = async (taiko, element) => {
    const hasHelper = helpers.some(helper => element.startsWith(helper));
    const hasSelector = selectors.some(selector => element.startsWith(selector));
    if (hasHelper) {
        const helperValue = element.trim().substring(0, element.indexOf(" "));
        const elementValue = element.trim().substring(element.indexOf(" ") + 1);
        const selector = await getSelector(taiko, elementValue);
        
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
    } else if (hasSelector) {
        return await getSelector(taiko, element);
    }
    return element;
}

const getSelector = async (taiko, element) => {
    const hasSelector = selectors.some(selector => element.startsWith(selector));
    if (hasSelector) {
        const helperValue = element.trim().substring(0, element.indexOf(" "));
        const elementValue = element.trim().substring(element.indexOf(" ") + 1);
        const proximitySelector = await getProximitySelectors(taiko, elementValue);
        
        switch (helperValue) {
            case "$":
                return taiko.$(proximitySelector);
            case "image":
                return taiko.image(proximitySelector);
            case "link":
                return taiko.link(proximitySelector);
            case "listItem":
                return taiko.listItem(proximitySelector);
            case "button":
                return taiko.button(proximitySelector);
            case "fileField":
                return taiko.fileField(proximitySelector);
            case "timeField":
                return taiko.timeField(proximitySelector);
            case "textBox":
                return taiko.textBox(proximitySelector);
            case "dropDown":
                return taiko.dropDown(proximitySelector);
            case "checkBox":
                return taiko.checkBox(proximitySelector);
            case "radioButton":
                return taiko.radioButton(proximitySelector);
            case "text":
                return taiko.text(proximitySelector);
            case "tableCell":
                return taiko.tableCell(proximitySelector);
            case "color":
                return taiko.color(proximitySelector);
            case "range":
                return taiko.range(proximitySelector);
            default:
                break;
        }
    }
    return element;
}

const getProximitySelectors = async (taiko, element) => {
    const hasProximitySelector = proximitySelectors.some(proximitySelector => element.startsWith(proximitySelector));
    if (hasProximitySelector) {
        const helperValue = element.trim().substring(0, element.indexOf(" "));
        const elementValue = element.trim().substring(element.indexOf(" ") + 1);
        
        switch (helperValue) {
            case "toLeftOf":
                return taiko.toLeftOf(elementValue);
            case "toRightOf":
                return taiko.toRightOf(elementValue);
            case "above":
                return taiko.above(elementValue);
            case "below":
                return taiko.below(elementValue);
            case "near":
                return taiko.near(elementValue);
            case "within":
                return taiko.within(elementValue);
            default:
                break;
        }
    }
    return element;
}

async function getFileContent(path) {
    return fs.existsSync(path) ? await readFile(path, 'utf8') : null;
}

exports.getPageElement = async (taiko, element) => {
    const _element = await getHelper(taiko, element);
    if (_element !== element) {
        return _element;
    }
    
    let elementText;
    if (element.includes("with text")) {
        const elementParts = element.split("with text");
        element = elementParts[0].trim();
        elementText = elementParts[1].trim();
    }
    
    const currentPageName = _helpers.getScenarioData("currentPageName");
    let fileText = await getFileContent("./tests/pages/" + currentPageName + ".json");
    let fileObject;
    let hasElement;
    if (fileText == null) {
        fileText = await getFileContent("./tests/pages/common.json");
    }

    fileObject = JSON.parse(fileText);
    hasElement = fileObject.hasOwnProperty(element);
    if (!hasElement) {
        fileText = await getFileContent("./tests/pages/common.json");
        fileObject = JSON.parse(fileText);
        hasElement = fileObject.hasOwnProperty(element);
    }
    if (hasElement) {
        let elementLocatorValue = fileObject[element];
        elementLocatorValue = elementText ?
            elementLocatorValue.replace("{text}", elementText) : elementLocatorValue;
        return await taiko.$(elementLocatorValue);
    }
    
    return element;
}

exports.checkElementState = async (taiko, element, elementState) => {
    const pageElement = await this.getPageElement(taiko, element);
    switch (elementState) {
        case "exist":
            await this.scrollToElementView(taiko, pageElement);
            await taiko.waitFor(async () => (pageElement.exists()));
            break;
        case "displayed":
        case "visible":
            if (pageElement === element) {
                await this.scrollToElementView(taiko, pageElement);
                await taiko.waitFor(pageElement);
            } else {
                await this.scrollToElementView(taiko, pageElement);
                await taiko.waitFor(async () => (pageElement.isVisible()));
            }
            break;
        case "enabled":
            await this.scrollToElementView(taiko, pageElement);
            await taiko.waitFor(async () => !(await pageElement.isDisabled()));
            break;
        case "not exists":
            let waitSeconds = 0;
            console.log("=> ");
            console.log(pageElement);
            let isPageElementExists = await pageElement.exists(1000, 200);
            while (isPageElementExists && waitSeconds < 5) {
                await taiko.waitFor(1000);
                waitSeconds++;
                isPageElementExists = await pageElement.exists(1000, 200);
            }
            if (isPageElementExists) {
                assert.fail("Element exists!");
            }
            break;
        case "not displayed":
        case "not visible":
            await taiko.waitFor(async () => !(await pageElement.isVisible()));
            break;
        case "not enabled":
        case "disabled":
            await this.scrollToElementView(taiko, pageElement);
            await taiko.waitFor(async () => (await pageElement.isDisabled()));
            break;
        default:
            assert.fail("Element state \"" + elementState + "\" undefined");
    }
}

exports.scrollToElementView = async (taiko, element) => {
    await taiko.scrollTo(element, { blockAlignment: 'center', inlineAlignment: 'center' });
}
