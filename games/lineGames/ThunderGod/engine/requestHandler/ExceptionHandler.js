function checkForNull(data) {
  try {
    for (const key in data) {
      if (data[key] === null) {
        throw new Error(`Error: Null value found for key '${key}'`);
      }

      if (typeof data[key] === "object") {
        checkForNull(data[key]);
      } else if (Array.isArray(data[key])) {
        for (const item of data[key]) {
          if (typeof item === "object") {
            checkForNull(item);
          }
        }
      }
    }
  } catch (error) {
    // showMessage("json values having some references null", "error");
    console.error(error.message);
  }
}

module.exports = { checkForNull };
