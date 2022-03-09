import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    movies: [],
    contact: []
  },
  getters: {
    fetchMovies: state => state.movies,
    fetchContact: state => state.contact
  },

  mutations: {
    ADD_MOVIE: (state, payload) => {
      state.movies.unshift(payload);
    },

    MOVIES: (state, payload) => {
      state.movies = payload; 
  },
  ADD_CONTACT: (state, payload) => {
    state.contact.unshift(payload);
  },

  CONTACT: (state, payload) => {
    state.contact = payload;
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
          this.$swal("Great!", "Movie added successfully!", "success");
        })
        .catch(() => {
          this.$swal("Oh oo!", "Could not add the movie!", "error");
      })},
      addContact: (context, payload) => {
        return axios({
          method: "post",
          data: payload,
          url: "/contact",
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
      fetchContact: (context, payload) => {
        axios({
          method: "get",
          url: "/contact"
        })
          .then(response => {
            context.commit("CONTACT", response.data.contact);
          })
          .catch(() => {});
        }}})
