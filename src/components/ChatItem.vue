<template>
  <li
    class="chat-item"
    :class="{ 'own-message': ownMessage }"
    v-show="ownMessage !== null"
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
      <span class="chat-name" v-show="!ownMessage">{{ obj.author }}</span>
      <p class="chat-text">{{ obj.text }}</p>
      <span class="date-created">{{ timeCreated }}</span>
      <item-dropdown
        :ownMessage="ownMessage"
        @event="handleEvent"
        v-if="ownMessage"
      />
    </div>
  </li>
</template>

<script>
import { format } from "date-fns";
import { auth } from "../store/auth";
import { deleteMessage, editMessage } from "../store/firestore";
import DefaultAvatar from "./common/DefaultAvatar";
import ItemDropdown from "./common/ItemDropdown";

export default {
  name: "ChatItem",
  components: {
    DefaultAvatar,
    ItemDropdown,
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
      timeCreated: "",
    };
  },
  created() {
    this.ownMessageCheck();
  },
  methods: {
    handleEvent(method) {
      switch (method) {
        case "reply":
          this.handleReply(); // *in progress
          break;
        case "edit":
          this.handleEdit({}); // *in progress
          break;
        case "delete":
          this.handleDelete();
          break;
      }
    },
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
    async handleEdit(newDate) {
      if (this.ownMessage) {
        try {
          await editMessage(this.obj.id, newDate);
        } catch (err) {
          console.log(err.message);
          return err;
        }
      }
    },
    async handleDelete() {
      if (this.ownMessage) {
        try {
          await deleteMessage(this.obj.id);
        } catch (err) {
          console.log(err.message);
          return err;
        }
      }
    },
    handleReply() {},
    getTimeCreated() {
      if (this.obj.created_at) {
        this.timeCreated = format(this.obj.created_at.toDate(), "h:mm aaa");
      }
    },
  },
  updated() {
    this.getTimeCreated();
    this.scrollToBottom();
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
  min-width: 40px;
  max-width: 40px;
  min-height: 40px;
  max-height: 40px;
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
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--bs-light);
  border-radius: calc(0.75rem - 3px);
  border-top-left-radius: 0;
  padding: 0.5rem 1rem;
  width: fit-content;
}
.chat-content .chat-name {
  color: var(--bs-gray-dark);
  font-size: 0.7rem;
}
.chat-content .chat-text {
  margin-bottom: 0;
}
.chat-content .dropdown {
  visibility: hidden;
}
.chat-content:hover .dropdown {
  visibility: visible;
}
.chat-content .dropdown {
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  border-radius: 99rem;
  background: linear-gradient(
    -45deg,
    rgba(255, 0, 0, 0),
    rgba(255, 255, 255, 0.3)
  );
}
.chat-content .dropdown > button:focus {
  box-shadow: none;
  outline: none;
}
.chat-content .dropdown .dropdown-toggle {
  color: var(--white);
}
.date-created {
  font-size: 0.7rem;
  color: var(--bs-gray);
  align-self: flex-end;
}

/* own message styles */
.own-message {
  flex-direction: row-reverse;
  justify-self: flex-end;
  text-align: right;
}
.own-message .chat-content {
  background: var(--bs-indigo);
  color: var(--bs-white);
  border-radius: calc(0.75rem - 3px);
  border-top-right-radius: 0;
}
.own-message .chat-text {
  color: var(--bs-light);
}
.own-message .date-created {
  align-self: flex-start;
  color: var(--light);
}
</style>