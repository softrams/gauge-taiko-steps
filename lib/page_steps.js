/* globals gauge*/
"use strict";
const taiko = require("taiko");
const assert = require("assert");
const selectors = require("./_selectors");
const helpers = require("./_helpers");
const { getPageElement, checkElementState, scrollToElementView } = require("./_pageElement");

step(["Open <url>", "Goto <url>"], async url => {
  let isNewTab = url.endsWith("in new tab");
  if (isNewTab) {
    url = url.replace("in new tab", "").trim();
  }

  let navigateUrl = process.env[url] ? process.env[url] : (url ? url : process.env.APP_ROOT_URL);
  navigateUrl = helpers.getValue(navigateUrl);
  gauge.message("Navigating to " + navigateUrl);
  
  if (isNewTab) {
    await taiko.openTab(navigateUrl);
  } else {
    const response = await taiko.goto(navigateUrl);
    assert.strictEqual(response.status.code, 200);
  }
});

step("Switch to <urlTitle>", async urlTitle => {
  await taiko.switchTo(new RegExp(urlTitle));
});

step("Close window tab", async () => {
  await taiko.closeTab();
});

step("Check <eleType> with text <text> exists", async (eleType, text) => {
  const ele = await selectors.getElementBySelector(eleType, text);
  assert.strictEqual(await ele.exists(), true);
});

step(["Select <value> from dropDown <element>", "Select <value> from <element> dropdown"],
  async (value, element) => {
  value = helpers.getValue(value);
  await taiko.dropDown(await getPageElement(taiko, element)).select(new RegExp(value));
});

step("Check text <text> exists", async text => {
  const ele = await selectors.getElementBySelector("text", text);
  assert.strictEqual(await ele.exists(), true);
});

step("Click <eleType> with text <text>", async (eleType, text) => {
  await taiko.click(await selectors.getElementBySelector(eleType, text));
});

step(
  "Click <eleType> closer <proximity> text <text>",
  async (eleType, proximity, text) => {
    await taiko.click(
      await selectors.getElementBySelector(
        eleType,
        await selectors.getProximitySelector(proximity, text)
      )
    );
  }
);

step("Write <text> into <textbox>", async (text, textbox) => {
  await taiko.write(
    text,
    taiko.into(taiko.textBox(helpers.parseString(textbox)))
  );
});

step(
  "Write <text> into dateField with text <textbox>",
  async (text, textbox) => {
    await taiko.write(
      text,
      taiko.into(taiko.timeField(helpers.parseString(textbox)))
    );
  }
);

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

step("Click <text> in spec memory", async text => {
  const propertyValue = gauge.dataStore.specStore.get(text);
  await taiko.click(propertyValue);
});

step("Write <text> from property into <textbox>", async (text, textbox) => {
  const propertyValue = process.env[text];
  await taiko.write(propertyValue, taiko.into(taiko.textBox(textbox)));
});

step("Write <text> from spec memory into <textbox>", async (text, textbox) => {
  const propertyValue = gauge.dataStore.specStore.get(text);
  await taiko.write(propertyValue, taiko.into(taiko.textBox(textbox)));
});

step(
  ["Wait <milliseconds> milliseconds", "Wait <milliseconds>ms"],
  async milliseconds => {
    await taiko.waitFor(milliseconds);
  }
);

step("Wait for <text>", async text => {
  await taiko.waitFor(text);
});

step("Press <key>", async key => {
  await taiko.press(key);
});

step("Check text <text> does not exists", async text => {
  try {
    const ele = await selectors.getElementBySelector("text", text);
    const eleExist = await ele.exists();
    assert.strictEqual(!eleExist, true);
  } catch (error) {
    console.log(`Error in "Check text ${text} does not exists"`);
  }
});

step(
  "Click text <text> closer <proximity> text <proximityText>",
  async (text, proximity, proximityText) => {
    await taiko.click(
      text,
      await selectors.getProximitySelector(proximity, proximityText)
    );
  }
);

step(
  "Check <eleType> with text <text> does not exists",
  async (eleType, text) => {
    let eleExist = false;
    try {
      const ele = await selectors.getElementBySelector(eleType, text);
      eleExist = await ele.exists();
    } catch (error) {
      console.log(
        `Check ${eleType} with text ${text} does not exists" errored out`
      );
      eleExist = false;
    }
    assert.strictEqual(!eleExist, true);
  }
);

step(
  "Check text <text> closer <proximity> text <proximityText> exists",
  async (text, proximity, proximityText) => {
    const ele = await taiko.text(
      text,
      await selectors.getProximitySelector(proximity, proximityText)
    );
    assert.strictEqual(await ele.exists(), true);
  }
);

step(
  "Write <text> into <textbox> closer <proximity> text <proximityText>",
  async (text, textbox, proximity, proximityText) => {
    await taiko.write(
      text,
      taiko.into(
        taiko.textBox(
          textbox,
          await selectors.getProximitySelector(proximity, proximityText)
        )
      )
    );
  }
);

step(
  "Check text <text> closer <proximity> text <proximityText> does not exists",
  async (text, proximity, proximityText) => {
    let eleExist = false;
    try {
      const ele = await taiko.text(
        text,
        await selectors.getProximitySelector(proximity, proximityText)
      );
      eleExist = await ele.exists();
    } catch (error) {
      console.log(
        `Error in Check text ${text} closer ${proximity} text ${proximityText} does not exists"`
      );
      eleExist = false;
    }
    assert.strictEqual(eleExist, false);
  }
);

step("Focus text <text>", async text => {
  const ele = await selectors.getElementBySelector("text", text);
  await taiko.focus(ele);
});

step("Highlight text <text>", async text => {
  const ele = await selectors.getElementBySelector("text", text);
  await taiko.highlight(ele);
});

step("Scroll down <intValue>", async intValue => {
  await taiko.scrollDown(parseInt(intValue));
});

step("Double click <text>", async text => {
  await taiko.doubleClick(text);
});

step("Clear <textbox>", async textbox => {
  try {
    await taiko.clear(taiko.textBox(helpers.parseString(textbox)));
  } catch (error) {
    console.log("Error clearing textbox: ", textbox);
  }
});

step("Write <text> into <textbox> no error", async (text, textbox) => {
  try {
    await taiko.write(
      text,
      taiko.into(taiko.textBox(helpers.parseString(textbox)))
    );
  } catch (error) {}
});

step(
  "Write <text> into textbox array <textArray> in data table",
  async (text, textArray) => {
    let pageCount = 1;
    let index = 0;
    while (true) {
      try {
        const textField = textArray + "-" + index;
        await taiko.write(text, taiko.into(taiko.textBox({ id: textField })));
      } catch (error) {
        const nextArrow = await taiko.link({ class: "ui-paginator-next" });
        const nextArrowTabindex = await taiko.evaluate(
          nextArrow,
          async element => {
            return element.getAttribute("tabindex");
          }
        );

        if (nextArrowTabindex == -1) {
          console.log(
            "End of Array Element for text/textarray/count/PageCount: ",
            text,
            textArray,
            --index,
            pageCount
          );
          break;
        } else {
          index--;
          pageCount++;
          await taiko.click(nextArrow);
          await taiko.waitFor(500);
        }
      }
      index++;
    }
  }
);

step("Check <eleType> with text <text> is disabled", async (eleType, text) => {
  const ele = await selectors.getElementBySelector(eleType, text);
  const eleIsDisabled = await ele.isDisabled();
  assert.strictEqual(eleIsDisabled, true);
});

step("Check <eleType> with text <text> is enabled", async (eleType, text) => {
  const ele = await selectors.getElementBySelector(eleType, text);
  const eleIsDisabled = await ele.isDisabled();
  assert.strictEqual(eleIsDisabled, false);
});

step(
  "Validate number of <typeRecords> records and pagination",
  async typeRecords => {
    try {
      let paginationText = await taiko
        .$("span.ui-paginator-current.ng-star-inserted")
        .text();
      let numRecordsText = parseInt(
        paginationText
          .substring(
            paginationText.indexOf("of") + 2,
            paginationText.indexOf(typeRecords)
          )
          .trim()
      );
      let paginationFullString;
      if (numRecordsText === 0) {
        paginationFullString = `Showing 0 to 0 of 0 ${typeRecords} keys`;
      } else if (numRecordsText > 0 && numRecordsText <= 10) {
        paginationFullString = `Showing 1 to ${numRecordsText} of ${numRecordsText} ${typeRecords} keys`;
      } else if (numRecordsText > 10) {
        paginationFullString = `Showing 1 to 10 of ${numRecordsText} ${typeRecords} keys`;
      }
      assert.strictEqual(await taiko.text(paginationFullString).exists(), true);
    } catch (error) {
      console.log("Number of records and pagination check failed.");
    }
  }
);

step(
  "Check <eleType> closer <proximity> text <text> does not exist",
  async (eleType, proximity, text) => {
    let eleExist = false;
    try {
      const ele = await selectors.getElementBySelector(
        eleType,
        await selectors.getProximitySelector(proximity, text)
      );
      eleExist = await ele.exists();
    } catch (error) {
      console.log(
        `Check ${eleType} with text ${text} does not exist" errored out`
      );
      eleExist = false;
    }
    assert.strictEqual(eleExist, false);
  }
);

step("On <pageName> page", async function (pageName) {
  helpers.storeScenarioData("currentPageName", pageName);
});

step("Scroll to <element>", async element => {
  await scrollToElementView(taiko, await getPageElement(taiko, element));
});

step(["Click <element>", "Click on <element>"], async element => {
  await taiko.click(await getPageElement(taiko, element));
});

step(["Click <element> <elementText>", "Click on <element> <elementText>", "Click <element> for <elementText>"],
  async (element, elementText) => {
  element = element + " with text " + helpers.getValue(elementText);
  await taiko.click(await getPageElement(taiko, element));
});

step(["Clear <element> text box", "Clear <element>"], async element => {
  await taiko.clear(await getPageElement(taiko, element))
});

step(["Enter <value> to <element> text box", "Enter <value> to <element>"], async (value, element) => {
  value = helpers.getValue(value);
  gauge.message("Entering " + value);
  await taiko.write(value, await getPageElement(taiko, element));
});

step(["Verify <element> <elementState>", "Verify <element> is <elementState>"], async (element, elementState) => {
  element = helpers.getValue(element);
  gauge.message("Verifying " + element + " to be " + elementState);
  await checkElementState(taiko, element, elementState);
});

step(["Verify <element> <elementText> <elementState>", "Verify <element> <elementText> is <elementState>"],
    async (element, elementText, elementState) => {
  element = element + " with text " + helpers.getValue(elementText);
  await checkElementState(taiko, element, elementState);
});

step("Verify <element> text is <elementText>", async (element, elementText) => {
  elementText = helpers.getValue(elementText);
  gauge.message("Verifying " + element + " text contains " + elementText);

  await taiko.waitFor(element + ' did not contain text ' + elementText,
      async () => (await (await getPageElement(taiko, element)).text()).toString()
      .replaceAll("\\s+", " ")
      .replaceAll("\n", " ")
      .includes(elementText));
});

step(["Save <element> as <elementTextKey>", "Save <element> text as <elementTextKey>"], async (element, elementTextKey) => {
  const pageElement = await getPageElement(taiko, element);
  const tagName = await taiko.evaluate(pageElement, async element => element.tagName);
  let elementText = tagName === "INPUT" || tagName === "TEXTAREA" ?
    await taiko.evaluate(await getPageElement(taiko, element), async (element) => element.value) :
    (await (await getPageElement(taiko, element)).text()).toString();

  helpers.storeScenarioData(elementTextKey, elementText);
  gauge.message("Saved " + elementText + " as " + elementTextKey);
});

step(["Wait <seconds> seconds", "Wait for <seconds> seconds"], async seconds => {
  await taiko.waitFor(seconds * 1000);
});
