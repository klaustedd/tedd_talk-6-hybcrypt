import {RouterContext} from 'https://deno.land/x/oak/mod.ts';
import { decode } from "https://deno.land/std/encoding/base64.ts"
import {AppRSAKeyPair, AesCbcCipher} from "../security/crypto.ts"

class MessageController {
    
    /**
     * @param {RouterContext} context - The request context
     */
    async receiveMessage(context : RouterContext) : Promise<void> {
        const body = await context.request.body().value;
        console.log(body);
        const encryptedIV = decode(body.iv);
        const encryptedKey = decode(body.key);
        const encryptedData = decode(body.data);

        //Descriptografando o key e IV utilizando chave privada RSA
        const iv = await AppRSAKeyPair.decryptRSA(encryptedIV);
        const key = await AppRSAKeyPair.decryptRSA(encryptedKey);
        const data = AesCbcCipher.decrypt(key, iv, encryptedData);

        console.log(iv, key, new TextDecoder().decode(data));

        context.response.status = 200;
    }
}

export default new MessageController();