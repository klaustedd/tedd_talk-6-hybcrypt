<template>
  <v-container>
    <v-alert type="success" v-if="success">{{success}}</v-alert>
    <v-alert type="error" v-if="error">{{error}}</v-alert>
    <v-row class="text-center d-flex justify-center" v-if="false" >
        <v-col cols="12" md="4"> 
          <v-select
          label = "Algoritmo de criptografia"
            :items="supportedAlgorithms"
            v-model="selectedAlgorithm"
          >
          </v-select>
        </v-col>
    </v-row>
    <v-row class="text-center  d-flex">
        <v-col cols="12" md="6"> 
          <v-textarea
            label="Insira aqui a mensagem que deseja enviar para o servidor"
            v-model="text"
            hint="Não se preocupe, ela é criptografada">
          </v-textarea>
          <v-btn color="info" @click="criptografarMensagem">Criptografar mensagem</v-btn>
        </v-col>
        <v-col cols="12" md="6"> 
          <v-textarea
            label="Sua mensagem criptografada e codificada em base64"
            v-model="encryptedText"
            readonly>
          </v-textarea>
          <v-btn color="success" @click="enviarMensagem" :disabled="encryptedText < 1">Enviar mensagem</v-btn>
        </v-col>
    </v-row>
    <v-row class="text-center  d-flex justify-center">
        
    </v-row>
    <v-row class=" d-flex justify-center m-t-30">
      <v-col cols="12" md="8"> 
          <v-textarea
            label="Essa é a chave pública de criptografia que utilizaremos"
            :value="publicKey"
            readonly>
          </v-textarea>
        </v-col>
    </v-row>
    {{secureTransport}}
  </v-container>
</template>

<script>
import SecurityService from "../services/SecurityService";
//import MessageService from "../services/MessageService";
import crypto from "crypto";

  export default {
    name: 'HelloWorld',

    created : function () {
      SecurityService.fetchPublicKey()
      .then( resp => {
          this.publicKey = resp.data;
      });

      SecurityService.supportedEncryptionAlgorithms()
      .then(resp => {
        this.supportedAlgorithms = resp.data;
        if (this.supportedAlgorithms.length > 0) {
          this.selectedAlgorithm = this.supportedAlgorithms[0];
        }
      });
    },

    methods : {

      criptografarMensagem() {

        this.error = false;
        this.encryptedText = ""; //<- guarda o valor criptografado do texto

        // const encryptedData = crypto.publicEncrypt(this.publicKey, Buffer.from(this.text, "utf-8"));
        // this.encryptedText = encryptedData.toString("base64");
        const randomPrivateKey = crypto.randomBytes(32);
        const randomIV = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', randomPrivateKey, randomIV);

        //Realizando criptografia AES
        const dataToEncrypt = Buffer.from(this.text, "utf-8");
        const encryptedData = Buffer.concat([cipher.update(dataToEncrypt), cipher.final()]);
        this.encryptedText = encryptedData.toString("base64");

        //Criptografando a chave gerada no cliente com criptografia RSA para ser decifrada pelo servidor
        this.secureTransport.key = crypto.publicEncrypt(this.publicKey, randomPrivateKey).toString("base64");
        this.secureTransport.iv = crypto.publicEncrypt(this.publicKey, randomIV).toString("base64");
        this.secureTransport.data = this.encryptedText;
      },

      enviarMensagem() {

      }

    },

    data: () => ({
        publicKey : undefined,
        supportedAlgorithms : [],
        selectedAlgorithm : undefined,
        text : "",
        encryptedText : "",
        error : false,
        success : false,

        secureTransport : {
          iv : String,
          key : String,
          alg : String,
          data : String
        }
    }),
  }
</script>
