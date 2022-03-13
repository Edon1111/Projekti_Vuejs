<template>
   <body>
      <section>
     <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in photo"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
   <section id="movies" > 
           <div class="coach" style="padding-left:40%; padding-top:1%"> 
             <v-btn link to="/users/login" v-if="!current_user" color="red darken-4">Read & rate a movie</v-btn>
              <v-btn link to="/movies" v-else-if="current_user" color="red darken-4">Read & rate a movie</v-btn>
           </div>
      </section>
      </section>

      <section id="about">
       <div class="row">
  <div class="column">
      <p>Enjoy on your TV.</p>
      <div class="p">
          <h4 style="padding-left:15px; color: #787878;">Watch on Smart TVs, Playstation, Xbox, Chromecast,<br> Apple TV, Blu-ray players, and more.
            </h4>
      </div>
  </div>
  <div class="column">
     <img src="https://powping.com/file/9c3a26bb37764d887fcef6646e4f237aa7995a2a21abdfb6e0591d87d063bc65" 
     style="padding-left:60px; padding-top:50px; max-width: 90%;
     max-height: 90%;">
  </div>
</div>
      <br><br>
      </section>


           <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best place to enjoy the most amazing movies</h2>
              <span class="subheading">
                No more restrictions, no more limits
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--darken-4">mdi-movie-play</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Download your best movies and watch it everywhere.</div>
                    </v-card-title>
                    <v-card-text>
                     Watching a movie wasnt never so easily.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--darken-4">mdi-video-vintage</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Create profiles for kids.</div>
                    </v-card-title>
                    <v-card-text>
                      Send kids on adventures with their favorite characters in a space made just for them—free with your membership.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="red--text text--darken-4">mdi-movie-roll</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Download your shows to watch offline.</div>
                    </v-card-title>
                    <v-card-text>
                     Save your favorites easily and always have something to watch.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

     

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


<style scoped>
   section{
   width: 100%;
   float: left;
   height: 75vh;
   position: relative;
   }
   #movies{
     background-color: rgb(255, 255, 255);
     height: 10vh;
    }
    
   #about{
   background-color: rgb(255, 255, 255);
   }
   
   .row {
    display: flex;
    }
    .column {
    flex: 50%;
    }
   p{
   position: absolute;
   color: #484848;
   left:110px;
   top:170px;
   font-size:220%;
   }
   .p{
    position: absolute;
   color: #484848;
   left:100px;
   top:220px;
   }   
   .p1{
      position: absolute;
   color: #484848;
   left:630px;
   top:650px;
   }
.social-icon {
  font-size: 21px;
  color: white;
}

</style>