function findSumCombinations(arr, target) {
  let combinations = []; // Store pairs of numbers that sum up to the target
  let numMap = new Map(); // Map to store encountered numbers

  for (let num of arr) {
    let complement = target - num; // Calculate the complement for the current number

    if (numMap.has(complement)) {
      // Check if complement exists in the map
      combinations.push([num, complement]); // Add the pair to the combinations array
    }

    numMap.set(num, true); // Add the current number to the map
  }

  let mergedArray = [].concat(...combinations).sort((a, b) => a - b); // Flatten and sort the combinations array
  let doubledTarget = target * 2; // Calculate the doubled target value

  let mergedCombinations = []; // Store combinations from the merged array that sum up to the doubled target
  findCombinations(0, [], mergedArray, doubledTarget, mergedCombinations); // Find combinations recursively

  return [combinations, mergedArray, mergedCombinations]; // Return the results
}

function findCombinations(
  index,
  currentCombination,
  mergedArray,
  target,
  mergedCombinations
) {
  if (currentCombination.reduce((sum, num) => sum + num, 0) === target) {
    // Check if the current combination sums up to the target
    mergedCombinations.push(currentCombination); // Add the current combination to the merged combinations array
    return;
  }

  if (currentCombination.reduce((sum, num) => sum + num, 0) > target) {
    // If the current combination exceeds the target, terminate this branch
    return;
  }

  for (let i = index; i < mergedArray.length; i++) {
    let newCombination = currentCombination.slice(); // Create a new combination array
    newCombination.push(mergedArray[i]); // Add the current element to the new combination
    findCombinations(
      i + 1,
      newCombination,
      mergedArray,
      target,
      mergedCombinations
    ); // Recursively find combinations
  }
}

// Test case
let arr = [1, 3, 2, 2, -4, -6, -2, 8];
let target = 4;

let [firstCombinations, mergedArray, secondCombinations] = findSumCombinations(
  arr,
  target
);

console.log(`First Combination For ${target}:`, firstCombinations);
console.log("Merge Into a single Array:", mergedArray);
console.log(`Second Combination For ${target * 2}:`, secondCombinations);
