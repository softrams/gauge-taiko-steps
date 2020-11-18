const taiko = require("taiko");
const helpers = require("./_helpers");

exports.getElementBySelector = async (eleType, eleText) => {
  const selText = typeof eleText === 'string' ? helpers.parseString(eleText) : eleText;

  let ele;
  switch (eleType) {
    case "$":
      ele = await taiko.$(selText);
      break;
    case "image":
      ele = await taiko.image(selText);
      break;
    case "link":
      ele = await taiko.link(selText);
      break;
    case "listItem":
      ele = await taiko.listItem(selText);
      break;
    case "fileField":
      ele = await taiko.fileField(selText);
      break;
    case "timeField":
      ele = await taiko.timeField(selText);
      break;
    case "textBox":
      ele = await taiko.textBox(selText);
      break;
    case "dropDown":
      ele = await taiko.dropDown(selText);
      break;
    case "checkBox":
      ele = await taiko.checkBox(selText);
      break;
    case "radioButton":
      ele = await taiko.radioButton(selText);
      break;
    case "text":
      ele = await taiko.text(selText);
      break;
    case "button":
      ele = await taiko.button(selText);
      break;
    default:
      break;
  }
  return ele;
};

exports.getProximitySelector = async (eleType, eleText) => {
  const selText = typeof eleText === 'string' ? helpers.parseString(eleText) : eleText;

  let ele;
  switch (eleType) {
    case "toLeftOf":
      ele = await taiko.toLeftOf(selText);
      break;
    case "toRightOf":
      ele = await taiko.toRightOf(selText);
      break;
    case "above":
      ele = await taiko.above(selText);
      break;
    case "below":
      ele = await taiko.below(selText);
      break;
    case "near":
      ele = await taiko.near(selText);
      break;
    case "within":
      ele = await taiko.within(selText);
      break;
    default:
      break;
  }
  return ele;
};