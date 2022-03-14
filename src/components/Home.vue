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
          <div>This is an online database of information related to films,television series, home videos, video games, and streaming content online – including cast, production crew and personal biographies, plot summaries, trivia, ratings, and fan and critical reviews</div>
         </v-flex>

        <v-flex xs4 md2>
           <v-img max-height="209" max-width="262"
            src="https://powping.com/file/9c3a26bb37764d887fcef6646e4f237aa7995a2a21abdfb6e0591d87d063bc65"></v-img>
        </v-flex>
       </v-layout>
     </v-container>

      <v-divider></v-divider>

     
          
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


