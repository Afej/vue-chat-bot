<template>
  <div class="chat-box">
    <div class="client-messages">
      <div
        class="chat-message"
        v-for="(message,index) in chats"
        v-bind:key="index"
        :class="message.author"
      >
        <div class="message">
          <img :src="message.imgsrc" class="avatar" alt="Active user avatar" />
          <span>{{ message.text }}</span>
        </div>
      </div>
    </div>
    <div class="input-container">
      <input
        class="chat-input"
        type="text"
        placeholder="enter message..."
        v-model="message"
        v-on:keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import WebhookService from "../WebhookService";

export default {
  data() {
    return {
      message: "",
      chats: []
    };
  },
  methods: {
    async sendMessage() {
      const message = this.message;
      this.message = "";

      this.chats.push({
        text: message,
        author: "client",
        imgsrc: "../images/user.png"
      });

      try {
        let response = await WebhookService.sendChat(message);

        this.chats.push({
          text: response,
          author: "server",
          imgsrc: "../images/bot.png"
        });
      } catch (error) {
        console.log(error);
        this.chats.push({
          text: "Error no response",
          author: "server",
          imgsrc: "../images/bot.png"
        });
      }
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 30px;
  margin-right: 20px;
}

.message {
  border-radius: 50px;
  padding: 5px 10px;
  position: relative;
  font-weight: bold;
  width: inherit;
}

span {
  position: absolute;
  top: 5px;
  padding: 8px;
  color: white;
  border-radius: 4px;
}

.client span {
  background: #0070c8;
}

.server span {
  background: #99cc00;
}
</style>