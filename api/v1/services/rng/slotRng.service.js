const { refreshRng } = require("./auth.rng");

const url = process.env.RNG_URL || "https://rng.vegassweeps.com/"; //NOTE Hardcoded

async function getSlotNumbers(list) {
  let response = await fetch(url + "slot-number/", {
    method: "POST",
    // Body
    body: JSON.stringify({
      number_range: list,
    }),
    // Header
    headers: {
      Authorization: `Bearer ${process.env.RNG_ACCESS}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  //Check if token expired
  if (response.status == 401) {
    await refreshRng();
    return await getSlotNumbers(list);
  }
  response = await response.json();
  if (!response.result) {
    throw "Unable to initialize RNG";
  }
  // console.log(response);
  return response;
}

module.exports = { getSlotNumbers };
