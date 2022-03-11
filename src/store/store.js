import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    movies: [],
    contacts: [],
    ratings: [],
    users: []
  },

  getters: {
    fetchMovies: state => state.movies,
    fetchUsers: state => state.users,
    fetchRatings: state => state.ratings,
    fetchContacts: state => state.contacts
  },

  mutations: {
    ADD_MOVIE: (state, payload) => {
      state.movies.unshift(payload);
    },
    DELETE_MOVIE(state, movieId) {
      let movies = state.movies.filter(m => m._id != movieId);
      state.movies = movies;
    },

    EDIT_MOVIE(state, movie) {
      state.movies.forEach(m => {
        if (m._id == movie) {
          m = movie;
        }
      });
    },

    MOVIES: (state, payload) => {
      state.movies = payload;
    },
    ADD_CONTACT: (state, payload) => {
      state.contacts.unshift(payload);
    },

    CONTACTS: (state, payload) => {
      state.contacts = payload;
    },

    USERS: (state, users) => {
      state.users = users;
    },
    RATINGS: (state, payload) => {
      state.ratings = payload;
    }
  },

  actions: {
    addMovie: (context, payload) => {
      return axios({
        method: "post",
        data: payload,
        url: "/movies",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          context.commit("ADD_MOVIE", response.data);
          alert("Great!", "Movie added successfully!", "success");
        })
        .catch(() => {
          alert("Oh oo!", "Could not add the movie!", "error");
        });
    },

    async deleteMovie({ commit }, movie) {
      //delete video on server
      await axios
        .delete(`/movies/${movie._id}`)
        .then(response => {
          commit("DELETE_MOVIE", movie._id);
          alert("Great!", "Movie deleted successfully!", "success");
        })
        .catch(() => {
          alert("Sorry, Could not delete the movie");
        });
      //delete video on state
    },

    async editMovie({ commit }, movie) {
      let response = await axios.put(`/movies/${movie._id}`, movie);
      let newMovie = response.movie;
      commit("EDIT_MOVIE", newMovie);
      return newMovie;
    },

    // deleteMovie: (context, movie) => {
    //   return axios({
    //     method: "delete",
    //     data: movie._id,
    //     url: `"/movies/${movie._id}"`,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //     .then(response => {
    //       context.commit("DELETE_MOVIE", response.data);
    //       alert("Great!", "Movie added successfully!", "success");
    //     })
    //     .catch(() => {
    //       alert("Oh oo!", "Could not add the movie!", "error");
    //     });
    // },
    addContact: (context, payload) => {
      return axios({
        method: "post",
        data: payload,
        url: "/contacts",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          context.commit("ADD_CONTACT", response.data);
          this.$swal("Great!", "We received your message!", "success");
        })
        .catch(() => {
          this.$swal("Oh oo!", "We didn't get your message!", "error");
        });
    },
    fetchMovies: (context, payload) => {
      axios({
        method: "get",
        url: "/movies"
      })
        .then(response => {
          context.commit("MOVIES", response.data.movies);
        })
        .catch(() => {});
    },

    fetchUsers: (context, payload) => {
      axios({
        method: "get",
        url: "/users"
      })
        .then(response => {
          context.commit("USERS", response.data.users);
        })
        .catch(() => {});
    },

    fetchContacts: (context, payload) => {
      axios({
        method: "get",
        url: "/contacts"
      })
        .then(response => {
          context.commit("CONTACTS", response.data.contacts);
        })
        .catch(() => {});
    },

    fetchRatings: (context, payload) => {
      axios({
        method: "get",
        url: "/ratings"
      })
        .then(response => {
          context.commit("RATINGS", response.data.ratings);
        })
        .catch(() => {});
    }
  }
});
