<template>
  <v-container>
    <h1>Admin Panel</h1>
    <h2>List of Movies</h2>

    <v-btn
      depressed
      color="primary"
      id="add_movie_link"
      flat
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
        <span>Show</span>
        <span>Edit</span>
        <v-btn>Delete</v-btn>
      </div>
    </div>

    <!-- <h1>List of Messages delivered from Contact Page</h1>
    <br />
    <hr />
    <br />
    <div class="flex-table">
      <div>Name</div>
      <div>Surname</div>
      <div>Message</div>
      <div>Email</div>
    </div>
    <div v-for="contact in contacts" :key="contact.id" class="flex-table">
      <div>{{ contact.name }}</div>
      <div>{{ contact.surname }}</div>
      <div>{{ contact.message }}</div>
      <div>{{ contact.email }}</div>
    </div> -->

    <h1>List of Registered Users</h1>

    <div class="flex-table">
      <div>Email</div>
      <div>Password</div>
    </div>
    <div v-for="user in users" :key="user.id" class="flex-table">
      <div>{{ user.email }}</div>
      <div>{{ user.password | abbreviate }}</div>
    </div>

    <!-- <h2>List of Ratings</h2>

    <div class="flex-table">
      <div>Movie_id</div>
      <div>User</div>
      <div>Rate</div>
    </div>
    <div v-for="rating in ratings" :key="rating.id" class="flex-table">
      <div>{{ rating.movie_id }}</div>
      <div>{{ rating.user_id }}</div>
      <div>{{ rating.rate }}</div>
    </div> -->
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["movies"])
    // ...mapGetters(["users"])
    // ...mapState(["contacts"])
  },

  filters: {
    abbreviate(text) {
      if (text) {
        text = text.replace("<p>", "");
        return text.slice(0, 50);
      }
    }
  }
};
</script>

<style scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 14%);
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
