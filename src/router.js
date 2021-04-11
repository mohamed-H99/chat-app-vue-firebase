import Vue from "vue";
import VueRouter from "vue-router";
// lazy-loading routes
const ChatPage = () => import("./pages/ChatPage");
const FormPage = () => import("./pages/FormPage");

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "*", redirect: { name: "form-page" } },
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
  ],
});

export default router;
