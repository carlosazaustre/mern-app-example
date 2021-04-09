import crypto from "crypto";

const generateSalt = () => crypto.randomBytes(8).toString("hex");

export function hash(password) {
  return new Promise((resolve, reject) => {
    const salt = generateSalt();

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

export function verify(password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString("hex"));
    });
  });
}
