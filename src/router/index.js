import Vue from "vue";
import Router from "vue-router";
import Movies from "@/components/Movies";
import Contact from "@/components/Contact";
import AddMovie from "@/components/AddMovie";
import Movie from "@/components/Movie";
import Register from "@/components/Register";
import Login from "@/components/Login";
import NotFound from "@/components/NotFound";
import Home from "@/components/Home";
Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: "/movies",
      name: "Movies",
      component: Movies
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact
    },
    {
      path: "/movies/add",
      name: "AddMovie",
      component: AddMovie
    },
    {
      path: "/movies/:id",
      name: "Movie",
      component: Movie
    },
    {
      path: "/users/register",
      name: "Register",
      component: Register
    },
    {
      path: "/users/login",
      name: "Login",
      component: Login
    },
    { 
      path: '/:notFound(.*)', 
      component: NotFound
    }
  ]
});
