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
  data() {
    return {
      isAuthorized: false,
      displayName: this.$route.params.username || this.$route.query.displayName,
      emailVerified: false,
    };
  },
  created() {
    store.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuthorized = true;
        if (user.displayName) this.displayName = user.displayName;
        this.emailVerified = user.emailVerified;
      } else {
        this.isAuthorized = false;
        this.$router.replace({ name: "form-page" }).catch(() => {});
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
