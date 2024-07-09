function getKenoNumbers(min_number, max_number, draw_count) {
  // Create an array to store all possible numbers in the range
  const numbers = Array.from({ length: max_number - min_number + 1 }, (_, index) => index + min_number);

  // Perform Fisher-Yates shuffle to randomize the array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Select the first n numbers from the shuffled array
  return numbers.slice(0, draw_count);
}

function getExcludingKenoNumbers(min_number, max_number, draw_count, excluded_numbers) {
  // Create an array to store all possible numbers in the range
  const numbers = Array.from({ length: max_number - min_number + 1 }, (_, index) => index + min_number);

  // Perform Fisher-Yates shuffle to randomize the array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Filter out excluded numbers
  const filteredNumbers = numbers.filter((num) => !excluded_numbers.includes(num));

  // Select the first n numbers from the shuffled and filtered array
  return filteredNumbers.slice(0, draw_count);
}

module.exports = { getKenoNumbers, getExcludingKenoNumbers };

//   // Example usage:
//   const n = 10;
//   const low = 1;
//   const high = 80;
//   const randomNumbers = getRandomNumbersInRange(n, low, high);
//   console.log(randomNumbers);
