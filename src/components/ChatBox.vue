<template>
  <div class="chat-box card" v-show="displayName">
    <div class="card-header">
      <!-- current user -->
      <h3 class="text-center">
        <em class="text-danger">{{ displayName }}</em>
      </h3>
    </div>
    <!-- chat list -->
    <chat-list />

    <footer class="chat-footer">
      <!-- chat form -->
      <chat-form @error="handleError" />
    </footer>
  </div>
</template>

<script>
import ChatList from "./ChatList";
import ChatForm from "./ChatForm";

export default {
  name: "ChatBox",
  components: {
    ChatList,
    ChatForm,
  },
  props: {
    displayName: {
      type: String,
      default: null,
    },
  },
  methods: {
    // chat-form error handler
    handleError(err) {
      console.log(err.message);
    },
  },
};
</script>

<style>
.chat-box {
  width: 600px;
  max-width: 95%;
}
</style>