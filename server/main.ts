import {Application} from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from "./routers/router.ts";

const PORT = 8000;

const app = new Application();
app.use(
    oakCors({
      origin: "http://localhost:3001"
    }),
);
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on port " + PORT);
await app.listen({ port : PORT});