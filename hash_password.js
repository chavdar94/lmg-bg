// Import the @node-rs/argon2 package
const argon2 = require("@node-rs/argon2");

// Function to hash a password
async function hashPassword(password) {
  try {
    // Hash the password
    const hash = await argon2.hash(password);

    // Log the hashed password
    console.log("Hashed password:", hash);

    return hash;
  } catch (err) {
    // Log any errors that occur
    console.error("Error hashing password:", err);
    throw err;
  }
}

// Example usage
const password = "QwER1234";
hashPassword(password);
