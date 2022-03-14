<template>
   <body>
  
     <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in photo"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
          <v-container>
           <v-layout justify-center > 
             <v-btn link to="/users/login" v-if="!current_user" depressed color="red darken-4" class="white--text">Read & rate a movie</v-btn>
              <v-btn link to="/movies" v-else-if="current_user" depressed  color="red darken-4" class="white--text">Read & rate a movie</v-btn>
           </v-layout>
          </v-container>
      <v-divider></v-divider>
     
     <v-container>
       <v-layout row wrap justify-space-around>
         <v-flex xs6 md4>
           
          <v-list-item-title class="headline title mb-1">About Us</v-list-item-title>
          <strong white--text>-</strong>
          <div>This is an online database of information related to films,television series, home videos, video games, and streaming content online – including cast, production crew and personal biographies, plot summaries, trivia, ratings, and fan and critical reviews</div>
         </v-flex>

        <v-flex xs4 md2>
           <v-img max-height="209" max-width="262"
            src="https://powping.com/file/9c3a26bb37764d887fcef6646e4f237aa7995a2a21abdfb6e0591d87d063bc65"></v-img>
        </v-flex>
       </v-layout>
     </v-container>

      

      <v-layout justify-center>
          <v-timeline
          align-top
          dense
        >
  
          <v-timeline-item
            color="black"
            small
          >
            <v-layout pt-3>
              <v-flex xs3>
                <strong>Profiles for kids.</strong>
              </v-flex>
              <v-flex>
                <div class="subheading">Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</div>
                <v-container>
                  <v-avatar size="110" tile>
                  <v-img
                    src="https://t3.ftcdn.net/jpg/02/94/94/78/360_F_294947844_akUXUJ4eiylpWhjJ1cP63Gq0iMrEOHno.jpg"
                  ></v-img>
                </v-avatar>
                </v-container>
                
              </v-flex>
            </v-layout>
          </v-timeline-item>
  
          <v-timeline-item
            color="red darken-4"
            small
          >
            <v-layout pt-3>
              <v-flex xs3>
                <strong>Watch everywhere.</strong>
              </v-flex>
              <v-flex>
                <div class="subheading">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</div>
                <v-container>
                  <v-avatar size="110" tile>
                  <v-img
                    src="https://lycom.co/wp-content/uploads/2018/04/watch-tv-everywhere.jpg"
                  ></v-img>
                </v-avatar>
                </v-container>
                
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            color="black"
            small
          >
            <v-layout pt-3>
              <v-flex xs3>
                <strong>Enjoy on your TV.</strong>
              </v-flex>
              <v-flex>
                <div class="subheading">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</div>
                <v-container>
                  <v-avatar size="110" tile>
                  <v-img
                    src="https://www.usnews.com/dims4/USNEWS/fe2964d/2147483647/crop/1996x1310%2B3%2B0/resize/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F9b%2Fd6%2F7498ee6440d1b6d5b2626c11ec46%2F200723-stock.jpg"
                  ></v-img>
                </v-avatar>
                </v-container>
                
              </v-flex>
            </v-layout>
          </v-timeline-item>

        </v-timeline>
      </v-layout>
          
   </body>

</template>

<script>
import axios from "axios";
  export default {
    data() {
    return {
      current_user: null,
      photo: [
          {
            src: 'https://cdn.thetealmango.com/wp-content/uploads/2021/09/expensive-films.jpg',
          },
          {
            src: 'https://images.summitmedia-digital.com/esquiremagph/images/2020/04/07/Top-Rated-Trinity-01.jpg',
          },
          {
            src: 'https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/1579830754870-9IAYNSOR0S7TP5SKI9VR/image-asset.jpeg',
          },
          {
            src: 'https://unrealitymag.com/wp-content/uploads/2013/01/et3.jpg',
          },
        ],
    };
  },
    mounted() {
    this.fetchUser();
  },
  methods:{
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

  }

  }
</script>


