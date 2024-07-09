const { refreshRng } = require("./auth.rng");

const url = process.env.RNG_URL || "https://rng.vegassweeps.com/"; //NOTE Hardcoded

async function getKenoNumbers(min_number, max_number, draw_count) {
  let obj = { min_number, max_number, draw_count };
  let response = await fetch(url + "keno-number/", {
    method: "POST",
    // Body
    body: JSON.stringify(obj),
    // Header
    headers: {
      Authorization: `Bearer ${process.env.RNG_ACCESS}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  //Check if token expired
  if (response.status == 401) {
    await refreshRng();
    return await getKenoNumbers(min_number, max_number, draw_count);
  }
  response = await response.json();
  if (!response.number_drawn) {
    throw "Unable to initialize RNG";
  }
  // console.log(response);
  return response.number_drawn;
}

async function getExcludingKenoNumbers(min_number, max_number, draw_count, excluded_numbers) {
  let obj = { min_number, max_number, draw_count: draw_count * 2 }; // Fetch double the draw count initially
  let response = await fetch(url + "keno-number/", {
    method: "POST",
    // Body
    body: JSON.stringify(obj),
    // Header
    headers: {
      Authorization: `Bearer ${process.env.RNG_ACCESS}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  //Check if token expired
  if (response.status == 401) {
    await refreshRng();
    return await getKenoNumbers(min_number, max_number, draw_count, excluded_numbers);
  }
  response = await response.json();
  if (!response.number_drawn) {
    throw "Unable to initialize RNG";
  }

  // Filter out excluded numbers
  let filteredNumbers = response.number_drawn.filter((num) => !excluded_numbers.includes(num));

  // Return only the required number of drawn numbers
  return filteredNumbers.slice(0, draw_count);
}

module.exports = { getKenoNumbers, getExcludingKenoNumbers };
