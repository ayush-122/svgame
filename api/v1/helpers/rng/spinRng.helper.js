function getSlotNumbers(list) {
  // console.log("Random");
  let response = {};
  response.result = list.map((obj) => {
    return Math.floor(Math.random() * (obj.high + 1 - obj.low) + obj.low);
  });
  return response;
}
module.exports = { getSlotNumbers };
