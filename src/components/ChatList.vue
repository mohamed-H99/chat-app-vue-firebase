<template>
  <ul class="chat-list" v-show="arr">
    <chat-item v-for="obj in arr" :obj="obj" :key="obj.id" />
  </ul>
</template>

<script>
import store from "../store/firestore";
import appAuth from "../store/auth";
import ChatItem from "./ChatItem";

export default {
  name: "ChatList",
  components: {
    ChatItem,
  },
  data() {
    return {
      arr: [],
    };
  },
  created() {
    appAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.handleRealTimeData();
      }
    });
  },
  methods: {
    handleRealTimeData() {
      // real-time messages
      store.messagesRef.orderBy("created_at").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            this.arr.push({
              id: change.doc.id,
              ...data,
            });
          } else if (change.type === "removed") {
            const id = change.doc.id;
            this.arr = this.arr.filter((obj) => obj.id !== id);
          }
        });
      });
    },
  },
};
</script>

<style>
.chat-list {
  list-style-type: none;
  margin: 0;
  padding: 0.5rem 1rem;
  height: 50vh;
  max-height: 50vh;
  overflow-y: auto;
  padding-bottom: 5px;
}
</style>