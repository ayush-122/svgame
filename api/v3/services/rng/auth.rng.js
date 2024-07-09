const url = process.env.RNG_URL || "https://rng.vegassweeps.com/";
const username = process.env.RNG_USERNAME || "rngusr";
const password = process.env.RNG_PASSWORD || "Fall@Rain9";

async function getRngToken() {
  let response = await fetch(url + "api/token/", {
    method: "POST",
    // Body
    body: JSON.stringify({
      username,
      password,
      otp_auth: "string",
    }),
    // Header
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  response = await response.json();
  if (!response.access) {
    throw "Unable to initialize RNG";
  }
  process.env["RNG_ACCESS"] = response.access;
  process.env["RNG_REFRESH"] = response.refresh;
}

async function refreshRng() {
  console.log("**********************Refresh*********************");
  let response = await fetch(url + "api/token/refresh/", {
    method: "POST",
    // Body
    body: JSON.stringify({
      refresh: process.env.RNG_REFRESH,
    }),
    // Header
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  response = await response.json();
  if (!response.access) {
    throw "Unable to initialize RNG";
  }
  process.env["RNG_ACCESS"] = response.access;
}

// getRngToken();
module.exports = { getRngToken, refreshRng };
