<template>
  <li
    class="chat-item"
    :class="{ 'own-message': ownMessage }"
    v-show="ownMessage === true || ownMessage === false"
  >
    <!-- user avatar -->
    <span
      v-show="!ownMessage"
      class="chat-author btn btn-light"
      :title="obj.author"
    >
      <img v-if="obj.avatar_url" :src="obj.avatar_url" :alt="obj.author" />
      <default-avatar v-else />
    </span>
    <div class="chat-content">
      <span class="chat-username" v-show="!ownMessage">{{ obj.author }}</span>
      <!-- <a href="#" class="chat-delete" v-show="ownMessage" @click="handleDelete"
        >delete</a
      > -->
      <p class="chat-text">{{ obj.text }}</p>
      <!-- <span class="date-created">{{ dateCreatedFromNow }}</span> -->
    </div>
  </li>
</template>

<script>
import { formatDistanceToNow } from "date-fns";
import { auth } from "../store/auth";
import { deleteMessage, editMessage } from "../store/firestore";
import DefaultAvatar from "./common/DefaultAvatar";

export default {
  name: "ChatItem",
  components: {
    DefaultAvatar,
  },
  props: {
    obj: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      ownMessage: null,
      dateCreatedFromNow: "",
    };
  },
  created() {
    this.ownMessageCheck();
  },
  methods: {
    scrollToBottom() {
      const chatList = document.querySelector(".chat-list");
      if (chatList) {
        chatList.scrollTop = chatList.scrollHeight;
      }
    },
    ownMessageCheck() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          if (auth.currentUser.uid === this.obj.author_id) {
            this.ownMessage = true;
          } else {
            this.ownMessage = false;
          }
        }
      });
    },
    // delete message
    async handleDelete(e) {
      e.preventDefault();
      if (this.ownMessage) {
        try {
          await deleteMessage(this.obj.id);
        } catch (err) {
          console.log(err);
        }
      }
    },
    // edit message
    async handleEdit() {
      if (this.ownMessage) {
        try {
          await editMessage(this.obj.id, {});
        } catch (err) {
          console.log(err);
        }
      }
    },
    // get date created from now
    getDateCreatedFromNow() {
      if (this.obj.created_at) {
        this.dateCreatedFromNow = formatDistanceToNow(
          this.obj.created_at.toDate()
        );
      }
    },
  },
  updated() {
    this.scrollToBottom();
    this.getDateCreatedFromNow();
  },
};
</script>

<style>
.chat-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 0.5rem;
}
.chat-author {
  margin-right: 0.5rem;
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: 99rem;
}
.chat-author > * {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 99rem;
  font-size: 0.8rem;
  color: var(--bs-gray);
}
.chat-content {
  display: flex;
  flex-direction: column;
  background: var(--bs-light);
  border-radius: calc(0.75rem - 3px);
  border-top-left-radius: 0;
  padding: 0.5rem 1rem;
  width: fit-content;
  overflow: hidden;
}
.chat-content .chat-username,
.chat-content .chat-delete {
  color: var(--bs-gray);
  font-size: 0.7rem;
}
.chat-content .chat-text {
  margin-bottom: 0;
}

.date-created {
  font-size: 0.7rem;
  color: var(--bs-gray);
}

/* own message styles */
.own-message {
  flex-direction: row-reverse;
  justify-self: flex-end;
  text-align: right;
}
.own-message .chat-content {
  background: var(--bs-dark);
  color: var(--bs-white);
  border-radius: calc(0.75rem - 3px);
  border-top-right-radius: 0;
}
.own-message .chat-text {
  color: var(--bs-light);
}
</style>