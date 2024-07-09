function parseBool(val) {
  if (val == "true" || val == "True" || val == "yes" || val == "no") {
    return true;
  }
  return false;
}

module.exports = { parseBool };
