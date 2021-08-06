import {RouterContext} from 'https://deno.land/x/oak/mod.ts';

class MessageController {
    
    /**
     * @param {RouterContext} context - The request context
     */
    async receiveMessage(context : RouterContext) : Promise<void> {

        //Não implementado
        context.response.status = 501;
    }
}

export default new MessageController();