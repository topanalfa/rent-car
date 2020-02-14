import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import BookCar from "@/components/BookCar";
import AddCar from "@/components/AddCar";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/add",
      name: "add-car",
      component: AddCar
    },
    {
      path: "/book/:car_id",
      name: "book-car",
      component: BookCar
    }
  ]
});
