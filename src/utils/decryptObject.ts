import CryptoJS from 'crypto-js';

export default function decryptObject(ciphertext: string, key: string): any {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
}