import Vue from "vue";
import Router from "vue-router";
// import Movies from "@/components/Movies";
import Contact from "@/components/Contact";
import AddMovie from "@/components/AddMovie";
import EditMovie from "@/components/EditMovie";
import Movie from "@/components/Movie";
import Register from "@/components/Register";
import Login from "@/components/Login";
import NotFound from "@/components/NotFound";
import Movies from "@/components/Movies";
import Admin from "@/components/Admin";
import Home from "@/components/Home";
import AdminLogin from "@/components/AdminLogin";
import AdminRegister from "@/components/AdminRegister";

import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },

    {
      path: "/movies/edit",
      name: "EditMovie",
      component: EditMovie
    },

    {
      path: "/contacts",
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
      path: "/movies",
      name: "Movies",
      component: Movies
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
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/adminlogin",
      name: "AdminLogin",
      component: AdminLogin
    },
    {
      path: "/adminregister",
      name: "AdminRegister",
      component: AdminRegister
    },
    {
      path: "/:notFound(.*)",
      component: NotFound
    }
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      user => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Attention! Only Admin can have access.");
      next("/AdminLogin");
    }
  } else {
    next();
  }
});

export default router;
