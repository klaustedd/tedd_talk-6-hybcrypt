import ServiceAdapter from "./ServiceAdapter";

export default {

    /**
     * Return the supported key exchange algorithms
     * @param {Object} secureMessage
     * @returns {Promise<import("axios").AxiosResponse>}
     */
    enviarMensagem(secureMessage) {
        return ServiceAdapter.post("/messages", secureMessage);
    }
}