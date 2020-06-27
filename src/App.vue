<template>
  <div id="app">
    <div class="chat-container">
      <div class="head" @click="displayChatArea=!displayChatArea">
        <div style="justify-self: center;">Click to Chat!</div>
      </div>
      <div v-if="displayChatArea">
        <messages />
      </div>
    </div>
  </div>
</template>

<script>
import Messages from "@/components/Messages.vue";
import "./App.css";
export default {
  name: "app",
  components: {
    Messages
  },
  data: function() {
    return {
      displayChatArea: false
    };
  },
  methods: {}
};
</script>

