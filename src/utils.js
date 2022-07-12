const fs = require("fs");
const { createHash } = require("crypto");
import decryptor from "schoi-godaddy/cryptorr";

// Convert string to SHA256 string.
export const sha256 = (str) => {
  return createHash("sha256").update(str).digest("hex");
};

// Read config file based on file path.
export const ReadConfigFile = (filePath) => {
  let conf = "";
  fs.readFile(filePath, function read(err, data) {
    if (err) {
      throw err;
    }
    conf = data;
  });

  return conf;
};

// Decrypt db content with key remove the default key in the future please.
export const decryptDBContent = (content, key = "12qwaszx") => {
  return decryptor.decrypt(content, key);
};
