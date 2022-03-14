<template>
  <div id="container">
    <v-card class="mx-auto" max-height="40%" max-width="40%">
      <v-toolbar dark color="blue-grey darken-4">
        <v-toolbar-title>Admin Register </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field label="Email" v-model="email" required></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            required
          ></v-text-field>
          <p v-if="errMsg">{{ errMsg }}</p>
          <v-btn @click="register">
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-card-text></v-card
    >
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      show1: false,
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(data => {
          console.log("Succesfully registered!");
          this.$router.push({ name: "Admin" });
        })
        .catch(error => {
          console.log(error.code);
          alert(error.message);
        });
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
