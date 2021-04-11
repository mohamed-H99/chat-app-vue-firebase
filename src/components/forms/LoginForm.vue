<template>
  <form class="login-form" @submit="handleLogin">
    <div class="success-msg" v-show="successMsg">
      {{ successMsg }}
    </div>
    <div class="error-msg" v-show="errorMsg">
      {{ errorMsg }}
    </div>
    <!-- OAuth -->
    <div class="o-auth mb-3">
      <button type="button" class="btn btn-primary" @click="handleGoogle">
        Google
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-google"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
          />
        </svg>
      </button>
    </div>
    <!-- email -->
    <div class="form-group">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping-email">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-envelope-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"
            />
          </svg>
        </span>
        <input
          type="email"
          class="form-control"
          placeholder="Email address"
          aria-label="Email address"
          aria-describedby="addon-wrapping-email"
          v-model="formData['email']"
          required
        />
      </div>
    </div>
    <!-- password -->
    <div class="form-group">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping-password">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-key-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </span>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="addon-wrapping-password"
          v-model="formData['password']"
          required
        />
      </div>
      <a href="#" @click="handleForget" class="forget-link">Forget password?</a>
    </div>
    <p>
      Dont't have an account ?
      <a href="#" @click="handleSwitch">Signup</a>
    </p>
    <button type="submit" class="btn btn-secondary">Login</button>
  </form>
</template>

<script>
import {
  authWithGoogle,
  loginWithEmailAndPassword,
  resetPassword,
} from "../../store/auth";

export default {
  name: "LoginForm",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      successMsg: "",
      errorMsg: "",
    };
  },
  methods: {
    async handleLogin(e) {
      e.preventDefault();
      try {
        this.clearMessages();
        await loginWithEmailAndPassword(this.formData);
        e.target.reset();
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
    async handleGoogle() {
      try {
        this.clearMessages();
        const cred = await authWithGoogle(this.formData);
        this.$router
          .push({
            name: "chat-page",
            params: {
              username: cred.user.displayName,
              avatar_url: cred.user.photoURL,
            },
            query: {
              displayName: cred.user.displayName,
            },
          })
          .catch(() => {});
      } catch (err) {
        this.handleErrorMessage(err.message);
      }
    },
    async handleForget() {
      try {
        this.clearMessages();
        await resetPassword(this.formData.email);
        this.handleSuccessMessage(
          "Reset link has been sent! Check your inbox."
        );
      } catch (err) {
        this.handleErrorMessage(err.message);
      }
    },
    handleSwitch(e) {
      e.preventDefault();
      this.clearMessages();
      this.$emit("switch", "signup");
    },
    handleErrorMessage(msg) {
      this.errorMsg = msg;
    },
    handleSuccessMessage(msg) {
      this.handleErrorMessage("");
      this.successMsg = msg;
      setTimeout(() => {
        this.successMsg = "";
      }, 3000);
    },
    clearMessages() {
      this.handleErrorMessage("");
      this.handleSuccessMessage("");
    },
  },
};
</script>

<style>
.forget-link {
  display: block;
  text-align: right;
  margin-top: 0.3rem;
}
</style>
