<template>
  <div class="form-page container" v-show="isAuthorized">
    <div class="card">
      <div class="card-header">
        <h2 class="text-center fw-bold">
          {{ formType === "login" ? "Login" : "Signup" }} Form
        </h2>
      </div>
      <div class="card-body">
        <login-form v-show="formType === 'login'" @switch="handleSwitch" />
        <signup-form v-show="formType === 'signup'" @switch="handleSwitch" />
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../store/auth";
import SignupForm from "../components/forms/SignupForm";
import LoginForm from "../components/forms/LoginForm";

export default {
  name: "FormPage",
  components: {
    SignupForm,
    LoginForm,
  },
  data() {
    return {
      isAuthorized: false,
      formType: "signup",
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuthorized = true;
        this.$router.replace({ name: "chat-page" }).catch(() => {});
      } else {
        this.isAuthorized = false;
      }
    });
  },
  methods: {
    handleSwitch(type) {
      this.formType = type;
    },
  },
};
</script>

<style>
.form-page > * {
  width: 400px;
  max-width: 95%;
}
.form-group {
  margin-bottom: 1rem;
}
.error-msg,
.success-msg {
  display: block;
  padding: 0.2rem 0.4rem;
  border-radius: calc(0.25rem - 1px);
  margin-bottom: 1rem;
}
.error-msg {
  border: 1px solid rgba(220, 53, 69, 0.4);
  color: var(--bs-red);
  background-color: rgba(220, 53, 69, 0.05);
}
.success-msg {
  border: 1px solid rgb(25, 135, 84, 0.4);
  color: var(--bs-green);
  background-color: rgb(25, 135, 84, 0.05);
}
</style>