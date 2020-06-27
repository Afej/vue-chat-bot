<template>
  <div class="chat-box">
    <div class="client-messages">
      <div class="chat-message" v-for="(message,index) in chats" v-bind:key="index">
        <div class="active-user message message-to">
          <span>{{ message.query }}</span>
          <img src="../images/user.png" class="avatar" alt="avatar" />
        </div>
        <div class="bot message message-from">
          <img src="../images/bot.png" class="avatar" alt="avatar" />
          <span>{{ message.speech }}</span>
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
        query: message
      });

      try {
        let response = await WebhookService.sendChat(message);

        this.chats.push({
          speech: response
        });
      } catch (error) {
        console.log(error);
        this.chats.push({
          speech: "Error no response"
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
  display: flex;
  justify-content: space-between;
  border-radius: 50px;
  padding: 5px 10px;
  margin-bottom: 10px;
  position: relative;
  font-weight: bold;
  width: inherit;
}

.message span {
  position: relative;
  top: 5px;
}
.message-to {
  background-color: #2095fe;
  color: #fff;
  margin-left: 100px;
  text-align: right;
}
.message-from {
  background: #99cc00;
  color: #363636;
  margin-right: 100px;
}
</style>