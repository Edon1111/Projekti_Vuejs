<template>
  <v-layout>
    <v-flex xs4>
      <v-card width="500px">
           <v-btn style="color:#5665BE" v-bind:to="`/Movies`">Back</v-btn>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ movie.name }}</div>
          </div>
        </v-card-title>
        <v-card-text>
            Release Year: {{ movie.release_year }}
        </v-card-text>
        <v-card-text>
         Genre : {{ movie.genre }}
        </v-card-text>

         <v-card-text id="rate_movie"
          v-if="current_user"
          @click="rate">
          Rate this movie
        </v-card-text>

        <!-- <h6
          class="card-title"
          id="rate_movie"
          v-if="current_user"
          @click="rate"
        >
          Rate this movie
        </h6> -->
        <v-card-text>
         Original Language: {{ movie.originalLanguage }}
        </v-card-text>
         <v-card-text>
         RunTime: {{ movie.runTime }}
        </v-card-text>
         <v-card-text>
        {{ movie.moreDescription }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import StarRating from "vue-star-rating";
const wrapper = document.createElement("div");
// shared state
const state = {
  note: 0
};
// crate component to content
const RatingComponent = Vue.extend({
  data() {
    return { rating: 0 };
  },
  watch: {
    rating(newVal) {
      state.note = newVal;
    }
  },
  template: `
    <div class="rating">
      How was your experience getting help with this issues?
      <star-rating v-model="rating" :show-rating="false"></star-rating>
    </div>`,
  components: { "star-rating": StarRating }
});
const component = new RatingComponent().$mount(wrapper);
export default {
  name: "Movie",
  data() {
    return {
      movie: [],
      current_user: null
    };
  },
  mounted() {
    this.fetchMovie();
    this.fetchUser();
  },
  methods: {
    async rate() {
      this.$swal({
        content: component.$el,
        buttons: {
          confirm: {
            value: 0
          }
        }
      }).then(() => {
        // this.$swal('Thanks for note ' + state.note);
        const movieId = this.$route.params.id;
        const userId = this.current_user.id;
        return axios({
          method: "post",
          data: {
            rate: state.note,
            user_id: userId
          },
          url: `/movies/rate/${movieId}`,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(() => {
            this.$swal(`Thank you for rating ${state.note}!`, "success");
          })
          .catch(error => {
            const message = error.response.data.message;
            this.$swal("Oh oo!", `${message}`, "error");
          });
      });
    },
    async fetchMovie() {
      return axios({
        method: "get",
        url: `/api/movies/${this.$route.params.id}`
      })
        .then(response => {
          this.movie = response.data;
        })
        .catch(() => {});
    },
    async fetchUser() {
      return axios({
        method: "get",
        url: "/api/current_user"
      })
        .then(response => {
          this.current_user = response.data.current_user;
        })
        .catch(() => {
          this.$router.push({ name: "Movies" });
        });
    }
  }
};
</script>
