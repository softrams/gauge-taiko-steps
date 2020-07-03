exports.parseString = text => {
  let result = text;
  try {
    result = JSON.parse(text);
  } catch (e) {}
  return result;
};
