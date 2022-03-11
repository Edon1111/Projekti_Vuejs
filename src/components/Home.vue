<template>
   <body>
      <div style="background-image: url('https://i.pinimg.com/originals/68/10/ed/6810ed53357d2e5cb82210c97de009b9.jpg');
         background-size: cover; height:70vh; margin: auto; padding-top:10px" ></div>

    <section id="movies"> 
           <div class="coach" style="padding-left:40%; padding-top:1%"> <v-btn link to="/movies" style="color:#5665BE">Read & rate a movie</v-btn></div>
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
     <img src="https://media4.giphy.com/media/3o7rc0qU6m5hneMsuc/giphy.gif" 
     style="padding-left:60px; padding-top:50px; max-width: 90%;
     max-height: 90%;">
  </div>
</div>

<div class="row">
   <div class="column">
     <img src="https://i.gifer.com/B3JL.gif" 
     style="padding-left:160px; padding-top:110px; max-width: 90%;
     max-height: 90%;">
  </div>
  <div class="column">
      <p style="position: absolute;
   color: #484848;
   left:670px;
   top:570px;
   font-size:220%;">Watch everywhere.</p>
      <div class="p1">
          <h4 style="padding-left:15px; color: #787878;">Stream unlimited movies and TV shows on your phone,<br> tablet, laptop, and TV without paying more.
            </h4>
      </div>
  </div>
</div>
      </section>
      <br><br>

   </body>
</template>


<style scoped>
   section{
   width: 100%;
   float: left;
   height: 75vh;
   position: relative;
   }
   #movies{
     background-color: #fff;
     height: 10vh;
    }
    
   #about{
   background-color: #fff;
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


</style>