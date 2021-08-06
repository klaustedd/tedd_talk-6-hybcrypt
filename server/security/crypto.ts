import { RSA }  from "https://deno.land/x/god_crypto@v1.4.10/rsa.ts";

const privateKey = RSA.parseKey(Deno.readTextFileSync("./security/privateKey.pem"));
const publicKey = RSA.parseKey(Deno.readTextFileSync("./security/publicKey.pem"));

const AppRSAKeyPair = {
    privateKey,
    publicKey
}

export {
    AppRSAKeyPair,
    //createCbcSymmetricCipher,
    //SupportedEncryptionAlgorithms
}