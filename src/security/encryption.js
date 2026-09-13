const crypto = require("crypto");

//   Generate a random 256-bit AES key.

const GenerateKey = () => {
    return crypto.randomBytes(32).toString("hex");
};

//  Encrypt data using AES-256-CBC.
 
const AESEncrypt = (value, keyHex) => {
    if (typeof value !== "string") {
        value = JSON.stringify(value);
    }

    const key = Buffer.from(keyHex, "hex");
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        key,
        iv
    );

    let encrypted = cipher.update(value, "utf8", "base64");
    encrypted += cipher.final("base64");

    return `${iv.toString("hex")}:${encrypted}`;
};

//   Encrypt data.
 
const EncryptData = (clearText) => {
    const aesKey = GenerateKey();

    const encData = AESEncrypt(clearText, aesKey);

    return `${encData}:${aesKey}`;
};

//  Decrypt AES-256-CBC data.
 
const AESDecrypt = (encryptedData, keyHex) => {
    const parts = encryptedData.split(":");

    const ivHex = parts[0];
    const encryptedText = parts[1];

    const key = Buffer.from(keyHex, "hex");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        key,
        iv
    );

    let decrypted = decipher.update(
        encryptedText,
        "base64",
        "utf8"
    );

    decrypted += decipher.final("utf8");

    return decrypted;
};

// Decrypt data.
 
const DecryptData = (encryptedData) => {
    const parts = encryptedData.split(":");

    if (parts.length !== 3) {
        throw new Error("Invalid encrypted data format");
    }

    const iv = parts[0];
    const encryptedText = parts[1];
    const aesKey = parts[2];

    return AESDecrypt(
        `${iv}:${encryptedText}`,
        aesKey
    );
};


module.exports = {
    GenerateKey,
    AESEncrypt,
    EncryptData,
    AESDecrypt,
    DecryptData
};