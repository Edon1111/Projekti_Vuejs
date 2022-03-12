<template>
  <v-app id="inspire">
    <router-link v-bind:to="{ name: 'Home' }">
    </router-link>

    <v-toolbar color="red darken-4" dark fixed app>
       <v-toolbar-side-icon>
        <v-img src="http://www.bcslogic.com/wp-content/uploads/2018/06/2018.06.06-Brett-feature.png" >
      
    </v-toolbar-side-icon>  
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text to="/admin">Admin </v-btn>

        <v-btn v-bind:to="{ name: 'Home' }" flat>
          <v-list-tile>
            <v-list-tile-content id="Home">Home</v-list-tile-content>
          </v-list-tile>
        </v-btn>

        <v-btn v-bind:to="{ name: 'Movies' }" flat>
          <v-list-tile>
            <v-list-tile-content id="Movies">Movies</v-list-tile-content>
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


    <v-footer color="red darken-4" app>
      <v-card-text class="white--text text-center">
        <strong>UBT College</strong>
      </v-card-text>

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
          this.$router.push({ name: "Movies" });
        })
        .catch(() => {});
    }
  }
};
</script>
