<template>
  <v-container>
    <h1>ADMIN DASHBOARD</h1>
    <v-btn @click="show = !show">List of Movies</v-btn>
    <v-btn @click="show_1 = !show_1"
      >List of Messages delivered from Contact Page</v-btn
    >
    <v-btn @click="show_3 = !show_3">List of Ratings</v-btn>
    <v-btn @click="show_2 = !show_2">List of Registered Users</v-btn>

    <br>
    <v-divider></v-divider>

    <v-card v-if="show">
      <br>
      <div v-if="show">
      <v-btn
        depressed
        dark
        color="green"
        id="add_movie_link"
        v-bind:to="{ name: 'AddMovie' }"
      >
        Add Movie
      </v-btn>

      <div class="flex-table">
        <div>Name</div>
        <div>Release Year</div>
        <div>Genre</div>
        <div>Original Language</div>
        <div>Run Time</div>
        <div>Description</div>
        <div>Actions</div>
      </div>
      <div v-for="movie in movies" :key="movie.id" class="flex-table">
        <div>{{ movie.name }}</div>
        <div>{{ movie.release_year }}</div>
        <div>{{ movie.genre }}</div>
        <div>{{ movie.originalLanguage }}</div>
        <div>{{ movie.runTime }}</div>
        <div>{{ movie.moreDescription | abbreviate }}</div>
        <div class="actions">
          <v-btn x-small v-bind:to="`/movies/${movie._id}`">Show</v-btn>
          <v-btn x-small>
            <router-link :to="{ name: 'EditMovie', params: { id: movie.id } }"
              >Edit</router-link
            ></v-btn
          >
          <v-btn x-small @click="deleteMovie(movie)">Delete</v-btn>
        </div>
      </div>
    </div>

    </v-card>


    <div v-if="show_1">
      <div class="flex-table" >
        <div>Name</div>
        <div>Surname</div>
        <v-spacer></v-spacer>
        <div>Email</div>
        <v-spacer></v-spacer>
         <div>Message</div>
      </div>
      <div v-for="contact in contacts" :key="contact.id" class="flex-table">
        <div>{{ contact.name }}</div>
        <div>{{ contact.surname }}</div>
        <v-spacer></v-spacer>
        <div>{{ contact.email }}</div>
        <v-spacer></v-spacer>
        <div>{{ contact.message }}</div>
      </div>
    </div>

   
    <div v-if="show_2">
      <div class="flex-table">
        <div>Email</div>
        <v-spacer></v-spacer>
        <div>Password</div>
      </div>
      <div v-for="user in users" :key="user.id" class="flex-table">
        <div>{{ user.email }}</div>
        <v-spacer></v-spacer>
        <div>{{ user.password | abbreviate }}</div>
      </div>
    </div>

    

    <div v-if="show_3" justify-space-around>
      <div class="flex-table" justify-space-around>
        <div>Movie_id</div>
        <v-spacer></v-spacer>
        <div>User_id</div>
        <v-spacer></v-spacer>
        <div>Rate</div>
      </div>
      <div v-for="rating in ratings" :key="rating.id" class="flex-table" justify-space-around>
        <div>{{ rating.movie_id }}</div>
        <v-spacer></v-spacer>
        <div>{{ rating._id}}</div>
        <v-spacer></v-spacer>
        <div>{{ rating.rate }}</div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
      show_1: false,
      show_2: false,
      show_3: false
    };
  },
  mounted() {
    this.$store.dispatch("fetchContacts");
    this.$store.dispatch("fetchMovies");
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchRatings");
  },
  computed: {
    ...mapState(["movies"]),
    ...mapState(["users"]),
    ...mapState(["contacts"]),
    ...mapState(["ratings"]),
    contacts() {
      return this.$store.getters.fetchContacts;
    },
    movies() {
      return this.$store.getters.fetchMovies;
    },
    users() {
      return this.$store.getters.fetchUsers;
    },
    ratings() {
      return this.$store.getters.fetchRatings;
    }
  },

  filters: {
    abbreviate(text) {
      if (text) {
        text = text.replace("<p>", "");
        return text.slice(0, 50);
      }
    }
  },

  methods: {
    deleteMovie(movie) {
      let response = confirm(`Are you sure you want to delete ${movie.name}`);
      if (response) {
        this.$store.dispatch("deleteMovie", movie);
      }
    }
  }
};
</script>

<style scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 12%);
  padding: 10px;
  border-bottom: 1px black solid;
  border-collapse: collapse;
}
.flex-table:nth-of-type(2n) {
  background-color: #dedede;
}
.flex-table .actions * {
  padding-right: 15px;
}
</style>
