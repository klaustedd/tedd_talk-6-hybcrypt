import {AppRSAKeyPair} from "../security/crypto.ts";
import {RouterContext} from 'https://deno.land/x/oak@v8.0.0/mod.ts';

class SecurityController {
    
    /**
     * @param {RouterContext} context - The request context
     */
    getAppPublicKeyPEM(context : RouterContext) : void {
        context.response.body = AppRSAKeyPair.publicKey.pem();
    }

    /**
     * @param {RouterContext} context - The request context
     */
     getSupportedEncryptionAlgorithms(context : RouterContext) : void {
        //context.response.body = SupportedEncryptionAlgorithms;
        context.response.body = [];
    }
}

export default new SecurityController();