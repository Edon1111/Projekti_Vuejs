<template>
  <div id="container">
    <v-card class="mx-auto" max-height="100%" max-width="90%">
      <v-toolbar dark color="blue-grey darken-4">
        <v-toolbar-title>Register </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            required
          ></v-text-field>

          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            :rules="passwordRules"
            v-model="password"
            required
          ></v-text-field>

          <!-- <v-btn @click="hidePassword()" v-if="visibility == 'text'"
                ><v-icon>mdi-eye-off</v-icon></v-btn
              >
              <v-btn @click="showPassword()" v-if="visibility == 'password'"
                ><v-icon>mdi-eye</v-icon></v-btn
              > -->

          <v-text-field
            name="input-7-1"
            label="Confirm Password"
            v-model="confirm_password"
            :rules="[
              this.password === this.confirm_password || 'Password must match'
            ]"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          ></v-text-field>

          <!-- <v-flex xs4 md2>
              <v-btn @click="hideConfirmPassword()" v-if="visibility1 == 'text'"
                ><v-icon>mdi-eye-off</v-icon></v-btn
              >
              <v-btn
                @click="showConfirmPassword()"
                v-if="visibility1 == 'password'"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
            </v-flex> -->

          <v-text style="padding-left:50px ; max-width:65%">
            Already have an account?
            <router-link :to="{ name: 'Login' }">Login here</router-link>
          </v-text>

          <v-spacer></v-spacer>
          <v-divider></v-divider>
          <v-btn @click="submit" :disabled="!valid">
            submit
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-card-text></v-card
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    // visibility: "password",
    // visibility1: "password",
    valid: true,
    show1: false,
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
    ],
    nameRules: [
      v => !!v || "Name is required",
      v => v.length > 2 || "Name must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length > 8 || "Password should contain at least 8 characters",
      v => /\d/.test(v) || "Password should contain a number or more ",
      v =>
        /[a-z]/.test(v) ||
        "Password should contain at least one lowercase letter",
      v =>
        /[A-Z]/.test(v) ||
        "Password should contain at least one uppercase letter",
      v =>
        /[!@#\$%\^\&*\)\(+=._-]/.test(v) ||
        "Password should contain at least special character"
    ],
    ConfirmPasswordRules: [v => !!v || "Confirm password is required"]
  }),
  methods: {
    // showPassword() {
    //   this.visibility = "text";
    // },
    // hidePassword() {
    //   this.visibility = "password";
    // },
    // showConfirmPassword() {
    //   this.visibility1 = "text";
    // },
    // hideConfirmPassword() {
    //   this.visibility1 = "password";
    // },
    async submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: "post",
          data: {
            name: this.name,
            email: this.email,
            password: this.password
          },
          url: "/users/register",

          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(() => {
            this.$swal(
              "Great!",
              "You have been successfully registered!",
              "success"
            );
            this.$router.push({ name: "Login" });
          })
          .catch(error => {
            const message = error.response.data.message;
            this.$swal("Oh oo!", `${message}`, "error");
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
#container {
  width: 50%;
  margin: auto;
}
</style>
