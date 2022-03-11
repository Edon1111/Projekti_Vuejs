<template>
  <div>
    <v-img
      max-height="50%"
      max-width="40%"
      src="https://www.qloudy.io/wp-content/uploads/2019/06/Untitled-5.png"
      align="left"
    ></v-img>
    <div id="container">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Name"
          v-model="name"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Surname"
          v-model="surname"
          required
          :rules="surnameRules"
        ></v-text-field>
        <v-text-field
          label="Email"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-textarea
          name="input-7-1"
          label="Message"
          v-model="message"
          multi-line
          required
          :rules="messageRules"
        ></v-textarea>
        <v-btn @click="submit" :disabled="!valid">
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    surname: "",
    message: "",
    email: this.email,
    nameRules: [v => !!v || " Name is required"],
    surnameRules: [v => !!v || " Surname is required"],
    messageRules: [
      v =>
        (v && v.length <= 200) ||
        "Message must be less or equal to 200 characters."
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /\S+@\S+\.\S+/.test(v) || "E-mail must be valid"
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const contact = {
          name: this.name,
          surname: this.surname,
          message: this.message,
          email: this.email
        };
        this.$store.dispatch("addContact", contact);
        this.$refs.form.reset();
        this.$router.push({ name: "Movies" });
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
  position: fixed;
  right: 80px;
  top: 20%;
  width: 50%;
}
</style>
