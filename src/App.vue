<template>
  <v-app id="inspire">
    <router-link v-bind:to="{ name: 'Home' }">
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content id="home">haha</v-list-tile-content>
      </v-list-tile>
    </router-link>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          id="add_movie_link"
          flat
          v-bind:to="{ name: 'AddMovie' }"
          v-if="current_user && current_user.role === 'admin'"
        >
          Add Movie
        </v-btn>

        <v-btn v-bind:to="{ name: 'Home' }" flat>
          <v-list-tile>
            <v-list-tile-content id="Home">Home</v-list-tile-content>
          </v-list-tile>
        </v-btn>

        <v-btn v-bind:to="{ name: 'Contact' }" flat>
          <v-list-tile>
            <v-list-tile-content id="contact">Contact</v-list-tile-content>
          </v-list-tile>
        </v-btn>

        <v-btn id="user_email" flat v-if="current_user">{{
          current_user.email
        }}</v-btn>
        <v-btn flat v-bind:to="{ name: 'Register' }" v-if="!current_user">
          Register
        </v-btn>
        <v-btn flat v-bind:to="{ name: 'Login' }" v-if="!current_user"
          >Login</v-btn
        >
        <v-btn id="logout_btn" flat v-if="current_user" @click="logout"
          >Logout</v-btn
        >
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <div id="app">
          <router-view />
        </div>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import "./assets/stylesheets/main.css";
import bus from "./bus";
export default {
  name: "app",
  data: () => ({
    drawer: null,
    current_user: null
  }),
  props: {
    source: String
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
  },
  methods: {
    listenToEvents() {
      bus.$on("refreshUser", () => {
        this.fetchUser();
      });
    },
    async fetchUser() {
      return axios({
        method: "get",
        url: "/api/current_user"
      })
        .then(response => {
          this.current_user = response.data.current_user;
        })
        .catch(() => {});
    },
    logout() {
      return axios({
        method: "get",
        url: "/api/logout"
      })
        .then(() => {
          bus.$emit("refreshUser");
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    }
  }
};
</script>
