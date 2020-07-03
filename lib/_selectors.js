const taiko = require("taiko");
const helpers = require("./_helpers");

exports.getElementBySelector = async (eleType, eleText) => {
  const selText = helpers.parseString(eleText);
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
    case "button":
      ele = await taiko.button(selText);
      break;
    default:
      break;
  }
  return ele;
};
