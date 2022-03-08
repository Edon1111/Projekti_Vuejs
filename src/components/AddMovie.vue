<template>
  <div id="container">
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-textarea
        label="Movie Name"
        v-model="name"
        :rules="nameRules"
        required
      ></v-textarea>
      <v-textarea
        name="input-7-1"
        label="Movie Description"
        v-model="description"
        multi-line
      ></v-textarea>
      <v-select
        label="Movie Release Year"
        v-model="release_year"
        required
        :rules="releaseRules"
        :items="years"
      ></v-select>
      <v-textarea
        label="Movie Genre"
        v-model="genre"
        required
        :rules="genreRules"
      ></v-textarea>
      <v-textarea
        label="Original Language"
        v-model="originalLanguage"
        required
        :rules="nameRules"
      ></v-textarea>
      <v-textarea
        label="RunTime"
        v-model="runTime"
        required
        :rules="nameRules"
      ></v-textarea>
      <v-textarea
        label="More Description"
        v-model="moreDescription"
        required
        :rules="nameRules"
      ></v-textarea>
      <v-btn @click="submit" :disabled="!valid">
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    name: "",
    description: "",
    genre: "",
    release_year: "",
    originalLanguage:"",
    runTime:"",
    moreDescription:"",
    nameRules: [v => !!v || "This field is required"],
    genreRules: [
      v => !!v || "Movie genre year is required",
      v =>
        (v && v.length <= 80) ||
        "Genre must be less than equal to 80characters."
    ],
    select: null,
    years: ["2022", "2021", "2020", "2019","2018", "2017", "2016", "2015","2014", "2013", "2012", "2011","2010", "2009", "2008", "2007","2006", "2005","2004", "2003", "2002", "2001","2000"]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const movie = {
          name: this.name,
          description: this.description,
          release_year: this.release_year,
          genre: this.genre,
          originalLanguage:this.originalLanguage,
          runTime:this.runTime,
          moreDescription:this.moreDescription
        };
        this.$store.dispatch("addMovie", movie);
        this.$refs.form.reset();
        this.$router.push({ name: "Home" });
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
  margin: auto;
  width: 50%;
}
</style>
