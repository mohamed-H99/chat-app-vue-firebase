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
      name: "chat-page",
      component: ChatPage,
      props: true,
    },
    {
      path: "/auth",
      name: "form-page",
      component: FormPage,
    },
  ],
});

export default router;
