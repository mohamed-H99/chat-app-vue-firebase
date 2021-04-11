<template>
  <ul class="chat-list">
    <chat-item v-for="obj in arr" :obj="obj" :key="obj.id" />
  </ul>
</template>

<script>
import { messagesRef } from "../store/firestore";
import { auth } from "../store/auth";
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
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.handleRealTimeData();
      }
    });
  },
  methods: {
    handleRealTimeData() {
      messagesRef
        .orderBy("created_at")
        // .limitToLast(100)
        .onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const data = change.doc.data();
                this.arr.push({
                  id: change.doc.id,
                  ...data,
                });
              } else if (change.type === "modified") {
                const index = this.arr.findIndex(
                  (obj) => obj.id === change.doc.id
                );
                const data = change.doc.data();
                this.arr[index] = {
                  id: change.doc.id,
                  ...data,
                };
              } else {
                // removed
                this.arr = this.arr.filter((obj) => obj.id !== change.doc.id);
              }
            });
          },
          (err) => err
        );
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
}
</style>