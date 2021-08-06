import ServiceAdapter from "./ServiceAdapter";

export default {
    /**
     * Return the application public key used for RSA encryption
     * @returns {Promise<import("axios").AxiosResponse>}
     */
    fetchPublicKey : function() {
        return ServiceAdapter.get("/security/publicKey");
    },

    /**
     * Return the supported key exchange algorithms
     * @returns {Promise<import("axios").AxiosResponse>}
     */
    supportedEncryptionAlgorithms() {
        return ServiceAdapter.get("/security/supportedEncryptionAlgorithms");
    }
}