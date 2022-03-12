<template>
  <v-container>
    <div>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-textarea
          label="Movie Name"
          v-model="movie.name"
          :rules="nameRules"
          required
        ></v-textarea>
        <v-textarea
          name="input-7-1"
          label="Movie Description"
          v-model="movie.description"
          multi-line
        ></v-textarea>
        <v-textarea
          label="Thumnail URL"
          v-model="movie.thumbNail"
          required
          :rules="nameRules"
        ></v-textarea>
        <v-textarea
          label="Movie Url"
          v-model="movie.movieUrl"
          required
          :rules="nameRules"
        ></v-textarea>
        <v-select
          label="Movie Release Year"
          v-model="movie.release_year"
          required
          :rules="releaseRules"
          :items="years"
        ></v-select>
        <v-textarea
          label="Movie Genre"
          v-model="movie.genre"
          required
          :rules="genreRules"
        ></v-textarea>
        <v-textarea
          label="Original Language"
          v-model="movie.originalLanguage"
          required
          :rules="nameRules"
        ></v-textarea>
        <v-textarea
          label="RunTime"
          v-model="movie.runTime"
          required
          :rules="nameRules"
        ></v-textarea>
        <v-textarea
          label="More Description"
          v-model="movie.moreDescription"
          required
          :rules="nameRules"
        ></v-textarea>
        <v-btn @click="saveMovie" :disabled="!valid">
          Save Movie
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["movies"]),
    movie() {
      return this.movies.find(m => m.id == this.$route.params.id);
    }
  },
  data: () => ({
    valid: true,
    name: "",
    description: "",
    thumbNail: "",
    movieUrl: "",
    genre: "",
    release_year: "",
    originalLanguage: "",
    runTime: "",
    moreDescription: "",
    nameRules: [v => !!v || "This field is required"],
    genreRules: [
      v => !!v || "Movie genre year is required",
      v =>
        (v && v.length <= 80) ||
        "Genre must be less than equal to 80characters."
    ],
    select: null,
    years: [
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
      "2011",
      "2010",
      "2009",
      "2008",
      "2007",
      "2006",
      "2005",
      "2004",
      "2003",
      "2002",
      "2001",
      "2000"
    ]
  }),

  methods: {
    async saveMovie() {
      if (this.$refs.form.validate()) {
        this.movie = {
          name: this.name,
          description: this.description,
          thumbNail: this.thumbNail,
          movieUrl: this.movieUrl,
          release_year: this.release_year,
          genre: this.genre,
          originalLanguage: this.originalLanguage,
          runTime: this.runTime,
          moreDescription: this.moreDescription
        };
        await this.$store.dispatch("editMovie", this.movie);

        this.$router.push({ name: "Admin" });
      }
      return true;
    },

    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped></style>
