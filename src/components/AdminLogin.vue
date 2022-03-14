<template>
  <div id="container">
    <v-card class="mx-auto" max-height="40%" max-width="40%">
      <v-toolbar dark color="blue-grey darken-4">
        <v-toolbar-title>Admin Login </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field label="Email" v-model="email" required></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      errMsg: ""
    };
  },
  methods: {
    register() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(data => {
          alert("Succesfully sign in!");
          this.$router.push({ name: "Admin" });
        })
        .catch(error => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errMsg = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errMsg = "Incorrect password";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
