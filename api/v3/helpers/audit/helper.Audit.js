async function createResponseForAudit(last_state) {
  const ResponseObject = transformObjectForResponse(last_state);

  //NOTE - Adding keys to Raw Responses
  ResponseObject.gameId = last_state.game_id;
  ResponseObject.isCompleted = last_state.isCompleted;
  return ResponseObject;
}

function transformObjectForResponse(obj) {
  // Function to transform keys from lowercase underscored to camel casing
  function toCamelCase(str) {
    return str.replace(/_([a-z])/g, function (match, letter) {
      return letter.toUpperCase();
    });
  }

  // Function to check if the key contains any of the specified strings
  function containsKeyToExclude(key) {
    const keysToExclude = ["_id", "client_ip_address", "created_at" /*"isCompleted"*/];
    return keysToExclude.some((substr) => key.includes(substr));
  }

  // Function to transform the object
  function transform(obj) {
    const transformedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === "raw_response") {
        return value;
      }
      if (!containsKeyToExclude(key)) {
        const transformedKey = toCamelCase(key);
        if (typeof value === "object" && !Array.isArray(value)) {
          transformedObj[transformedKey] = transform(value);
        } else {
          transformedObj[transformedKey] = value;
        }
      }
    }
    return transformedObj;
  }

  return transform(obj);
}
function transformObject(obj) {
  // Function to transform keys from lowercase underscored to camel casing
  function toCamelCase(str) {
    return str.replace(/_([a-z])/g, function (match, letter) {
      return letter.toUpperCase();
    });
  }

  // Function to transform the object
  function transform(obj) {
    const transformedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      const transformedKey = toCamelCase(key);
      if (typeof value === "object" && !Array.isArray(value)) {
        transformedObj[transformedKey] = transform(value);
      } else {
        transformedObj[transformedKey] = value;
      }
    }
    return transformedObj;
  }

  return transform(obj);
}
module.exports = { createResponseForAudit, transformObject, transformObjectForResponse };

// async function checkLastState(last_state, wallet_id) {
//   if (last_state.length > 1) {
//     await Wallet.blockWallet(wallet_id);
//     return {
//       status: "blocked",
//       message: "Wallet Blocked, Please contact the Administrator"
//     };
//   } else if (last_state[0] && !last_state[0].isCompleted) {
//     return {
//       status: "pending",
//       last_state: last_state[0].raw_response
//     };
//   }

//   return {
//     status: "completed",
//     message: "No pending spins found"
//   };
// }
