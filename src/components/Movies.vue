<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md4 v-for="movie in movies" :key="movie._id">
        <v-card class="flex-container" height="300px">
          <v-card-title primary-title>
            <div class="headline">
              {{ movie.name }}
            </div>
            <span class="grey--text"
              >{{ movie.release_year }} ‧ {{ movie.genre }}</span
            >
          </v-card-title>
          <v-card-text>
            {{ movie.description }}
          </v-card-text>
          <v-btn style="color:#5665BE" flat v-bind:to="`/movies/${movie._id}`"
            >Read more & rate</v-btn
          >
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Movies",
  computed: {
    movies() {
      return this.$store.getters.fetchMovies;
    }
  },
  mounted() {
    this.$store.dispatch("fetchMovies");
  }
};
</script>
