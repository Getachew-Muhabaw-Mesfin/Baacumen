import crypto from "crypto";

let localEncryptToken = (token: string) => {
  let cipher_key = process.env.CIPHER_KEY as string;
  let cipher_iv = process.env.CIPHER_IV as string;

  const cipher = crypto.createCipheriv("aes-256-cbc", cipher_key, cipher_iv);

  let encrypted = cipher.update(token, "utf8", "hex");

  encrypted += cipher.final("hex");

  return encrypted;
};

let localDecryptToken = (encryptedToken: string) => {
  let cipher_key = process.env.CIPHER_KEY as string;
  let cipher_iv = process.env.CIPHER_IV as string;

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    cipher_key,
    cipher_iv
  );

  let decrypted = decipher.update(encryptedToken, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export default { localEncryptToken, localDecryptToken };
