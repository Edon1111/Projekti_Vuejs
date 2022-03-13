<template >
 <div id="container">
<v-card class="mx-auto" max-height="100%" max-width="70%">
      <v-toolbar dark color="blue-grey darken-4">
        <v-toolbar-title>Login </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field 
      label="Email"
      v-model="email"
      :rules="emailRules"
      required 
      style="padding-left:60px ; max-width:67%"
    ></v-text-field>

    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
    <v-text-field
      name="input-7-1"
      label="Password"
      v-model="password"
      :type="visibility"
    ></v-text-field>
      </v-flex>

      <v-flex xs4 md2>
        <v-btn @click="hidePassword()" v-if="visibility == 'text'"><v-icon>mdi-eye-off</v-icon></v-btn>
        <v-btn @click="showPassword()" v-if="visibility == 'password'"><v-icon>mdi-eye</v-icon></v-btn>
      </v-flex>
      
    </v-layout>

    <v-text>
      Don't have an account?
       <router-link :to="{ name: 'Register'}"
              >Signup here</router-link>
    </v-text>
   <v-divider></v-divider>
    <v-btn @click="submit" :disabled="!valid">
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
      </v-card-text></v-card>

 </div>
</template>

<script>
import axios from "axios";
import bus from "./../bus";

export default {
  data: () => ({
    valid: true,
    visibility:"password",
    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    showPassword(){
      this.visibility="text";
    },
    hidePassword(){
      this.visibility="password";
    },
    async submit() {
      return axios({
        method: "post",
        data: {
          email: this.email,
          password: this.password
        },
        url: "/users/login",

        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          window.localStorage.setItem("auth", response.data.token);
          this.$swal("Great!", "You are ready to start!", "success");
          bus.$emit("refreshUser");

          this.$router.push({ name: "Movies" });
        })
        .catch(error => {
          const message = error.response.data.message;
          this.$swal("Oh oo!", `${message}`, "error");
          this.$router.push({ name: "Login" });
        });
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
  #container{
    margin:auto;
    width:50%
  }
</style>