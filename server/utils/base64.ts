import {Base64} from "https://deno.land/x/bb64/mod.ts";

export default {
    /**
     * Encode an given input to x64 string
     */
     encode : function(input : Uint8Array) : string {
        return Base64.fromUint8Array(input).toString();
    }   
}