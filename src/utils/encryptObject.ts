import CryptoJS from 'crypto-js';

export default function encryptObject(object: any, key: string): string {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(object), key).toString();
    return ciphertext;
}