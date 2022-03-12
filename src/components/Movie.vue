<template>
  <v-container>
    <v-row>
      <v-col md="9" cols="12">
        <!-- <video-player
          class="video-js vjs-default-skin"
          ref="videoPlayer"
          :options="playerOptions"
        ></video-player> -->

        <LazyYoutube ref="lazyVideo" :src="movie.movieUrl"> </LazyYoutube>
        <div class="videoControls">
          <v-btn @click="handleClick('playVideo')">Play</v-btn>
          <v-btn @click="handleClick('stopVideo')">Stop</v-btn>
          <v-btn @click="handleClick('pauseVideo')">Pause</v-btn>
          <v-btn @click="handleClick('resetView')">Reset</v-btn>
        </div>
      </v-col>

      <v-col md="3" cols="12">
        <div class="h1">{{ movie.name }}</div>

        <div v-html="movie.description"></div>
        <div>Release Year: {{ movie.release_year }}</div>
        <div>Genre : {{ movie.genre }}</div>
        <div id="rate_movie" v-if="current_user" @click="rate">
          Rate this movie
        </div>
        <div>Original Language: {{ movie.originalLanguage }}</div>

        <div>RunTime: {{ movie.runTime }}</div>
        <div>
          {{ movie.moreDescription }}
        </div>
      </v-col>
    </v-row>
    <v-layout> </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import StarRating from "vue-star-rating";
require("videojs-youtube");
import { videoPlayer } from "vue-video-player";
import { LazyYoutube } from "vue-lazytube";

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

  components: {
    // videoPlayer,
    LazyYoutube
  },

  computed: {
    movie() {
      return this.$store.state.movies.find(
        mov => mov.id == this.$route.params.id
      );
    }
    // playerOptions() {
    //   return {
    //     src: this.movie.movieUrl
    //   };
    // }
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
        url: `/api/movies/${this.$route.params.id}`,
        headers: {
          "Content-Type": "application/json"
        }
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
    },

    handleClick(event) {
      this.$refs["lazyVideo"][event]();
    }
  }
};
</script>

<style>
.video-js {
  margin: auto;
}

.videoControls {
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
