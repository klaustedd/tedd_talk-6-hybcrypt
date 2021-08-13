import { RSA }  from "https://deno.land/x/god_crypto@v1.4.10/rsa.ts";
import { Cbc, Padding} from "https://deno.land/x/crypto@v0.10.0/block-modes.ts";
import { Aes } from "https://deno.land/x/crypto@v0.10.0/aes.ts";

const privateKey = RSA.parseKey(Deno.readTextFileSync("./security/privateKey.pem"));
const publicKey = RSA.parseKey(Deno.readTextFileSync("./security/publicKey.pem"));

const AppRSAKeyPair = {
    privateKey,
    publicKey,

    decryptRSA : async function(encryptedData : Uint8Array) : Promise<Uint8Array> {
        return (await new RSA(privateKey).decrypt(encryptedData)).binary();
    }
}

const AesCbcCipher = {
    decrypt : function(key : Uint8Array, iv : Uint8Array, encryptedData : Uint8Array) {
        return new Cbc(Aes, key, iv, Padding.PKCS7).decrypt(encryptedData);
    }
}

export {
    AppRSAKeyPair,
    AesCbcCipher
    //createCbcSymmetricCipher,
    //SupportedEncryptionAlgorithms
}