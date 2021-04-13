import Vue from "vue";
import VueRouter from "vue-router";

import FormPage from "./pages/FormPage";
const ChatPage = () => import("./pages/ChatPage");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "form-page",
      component: FormPage,
      props: true,
    },
    {
      path: "/chat",
      name: "chat-page",
      component: ChatPage,
      props: true,
    },
    { path: "*", redirect: { name: "form-page" } },
  ],
});

export default router;
