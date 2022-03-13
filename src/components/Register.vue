<template>
  <div id="container">
    <v-card class="mx-auto" max-height="100%" max-width="90%">
      <v-toolbar dark color="blue-grey darken-4">
        <v-toolbar-title>Contact Us </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="Name" v-model="name" required></v-text-field>
    <v-text-field
      label="Email"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field label="Password" v-model="password" required></v-text-field>
    <v-text-field
      name="input-7-1"
      label="Confirm Password"
      v-model="confirm_password"
    ></v-text-field>
    <v-btn @click="submit" :disabled="!valid">
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>  </v-card-text></v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
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
  #container{
    width:50%;
    margin:auto
  }
</style>