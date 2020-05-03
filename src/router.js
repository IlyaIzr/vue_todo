import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Edit_list from "./views/Edit_list.vue";

Vue.use(Router);

export default new Router ({
  routes: [
    {
      path: '/',
      name: "home",
      component: Home
    },
    {
      path: '/edit_:id',
      name: "edit",
      component: Edit_list,
      //props: {
      //  default: true,
      //  list_props: "list_props"
      //}
    }
  ]
})