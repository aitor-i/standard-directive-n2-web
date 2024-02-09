export function generateRandomID(): string {
  // Generate a random number between 0 and 999999, then add 1000000 to ensure it's at least 7 digits long
  const randomNum = Math.floor(Math.random() * 1000000) + 1000000;
  // Convert to string and take the last 6 characters to ensure the result is always 6 digits
  const id = randomNum.toString().substring(1);
  return id;
}

// Example usage
const randomID = generateRandomID();
console.log(randomID); // This will log a random 6-digit ID to the console
