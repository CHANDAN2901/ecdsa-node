const crypto = require("crypto");
const { toHex } = require("ethereum-cryptography/utils");
const secp = require("secp256k1");

// Generate a random 32-byte number
const privateKey = crypto.randomBytes(32);

console.log("privateKey:", privateKey.toString("hex"));

// Generate public key
const publicKey = secp.publicKeyCreate(privateKey, false);

console.log("publicKey:", toHex(publicKey));
