<template>
  <div class="chat-page container" v-show="isAuthorized">
    <!-- logout btn -->
    <button class="btn btn-danger mb-3" @click="handleSignOut">Logout</button>
    <!-- chat box -->
    <chat-box :displayName="displayName" />
  </div>
</template>

<script>
import store from "../firebase";
import ChatBox from "../components/ChatBox";

export default {
  name: "ChatPage",
  components: {
    ChatBox,
  },
  data: () => ({
    isAuthorized: null,
    displayName: this.$route.params.username,
  }),
  beforeCreate() {
    store.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuthorized = true;
        this.displayName = user.displayName || user.email;
      } else {
        this.isAuthorized = false;
        this.$router.replace("/auth").catch(() => {});
      }
    });
  },
  methods: {
    handleSignOut() {
      store.auth.signOut();
    },
  },
};
</script>

<style>
</style>