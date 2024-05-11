import * as crypto from "crypto";
import * as Config from "../config/Enviornment";
import * as CryptoJS from "crypto-js";



let password="Lumel@123";
let conversionOutput:string;

/**
 * @author PraveenKumar  K 
 * @date  09-10-2023
 * @description This function return password encryption.
 * @param {String} text
 */
  export let hashPassword = async (text) => {
    return await new Promise((resolve, reject) => {
      const hash = crypto.createHmac("sha256", Config.SERVER.SALT);
      hash.update(text.toString());
      resolve(hash.digest("hex"));
    });
  };

/**
 * @author PraveenKumar K
 * @date  09/05/2024
 * @description This function return decrypted item for given encryption using cryptojs
 * @param {String} encrypted
 */
export let encrypt = (textToConvert) => {
  return (conversionOutput = CryptoJS.AES.encrypt(
    textToConvert.trim(),
    password.trim()
  ).toString());
};

/**
 * @author PraveenKumar K
 * @date  09/05/2024
 * @description This function return encrypted item for given string using cryptojs
 * @param {String} text
 */
export let decrypt = (textToConvert) => {
  return (conversionOutput = CryptoJS.AES.decrypt(
    textToConvert.trim(),
    password.trim()
  ).toString(CryptoJS.enc.Utf8));
};

