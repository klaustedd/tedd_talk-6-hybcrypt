import {Router} from "https://deno.land/x/oak@v8.0.0/mod.ts"

const router = new Router();

/*Security*/
import SecurityController from "../controllers/security.controller.ts"
router.get("/security/supportedEncryptionAlgorithms", SecurityController.getSupportedEncryptionAlgorithms);
router.get("/security/publicKey", SecurityController.getAppPublicKeyPEM);

/*Message*/
import MessageController from "../controllers/message.controller.ts";
router.post("/messages", MessageController.receiveMessage);

export default router;