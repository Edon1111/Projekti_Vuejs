<template>
  <v-container grid-list-md>
    <div search-wrapper panel-heading>
      <v-form>
        <v-text-field outline label="Search for a movie" append-icon="search" v-model="search"></v-text-field>
      </v-form>
      <br />
      <br />
    </div>
    <v-layout row wrap>
      <v-flex md4 v-for="movie in filteredMovies" :key="movie._id">
        <br>
        <v-card class="flex-container mx-auto" max-width="344">
          <v-img :src="movie.thumbNail" height="200px"> </v-img>
          <v-card-title primary-title>
            <div class="headline">
              {{ movie.name }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            <span class="grey--text"
              >{{ movie.release_year }} ‧ {{ movie.genre }}</span
            >
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="deep-orange lighten-3" text 
                v-bind:to="`/movies/${movie._id}`">
             Read more and rate
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                {{ movie.description }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Movies",
  data() {
    return {
      search: "",
      show: false
    };
  },
  computed: {
    movies() {
      return this.$store.getters.fetchMovies;
    },
    filteredMovies() {
      return this.movies.filter(moviess =>
        moviess.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  mounted() {
    this.$store.dispatch("fetchMovies");
  }
};
</script>
