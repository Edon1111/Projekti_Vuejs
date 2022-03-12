<template>
  <v-container grid-list-md>
    <div search-wrapper panel-heading>
      <input
        type="text"
        style="border: 1px solid grey;
          border-radius: 5px;
          height: 25px;
          width: 100%;
          padding: 2px 23px 2px 30px;
          outline: 0;
          background-color: #f5f5f5;"
        v-model="search"
        placeholder="Search for a movie"
      />
      <br />
      <br />
    </div>
    <v-layout row wrap>
      <v-flex md4 v-for="movie in filteredMovies" :key="movie._id">
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
            <v-btn color="orange lighten-2" text 
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
