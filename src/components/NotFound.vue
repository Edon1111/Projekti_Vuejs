<template>
    <div style="background-color: #F1F6F9;
               position: absolute;
                top: 50%;
                left: 50%;
                margin: -200px 0 0 -300px;
                font-family:sans-serif;
                min-height: 50vh;
                width:600px
                padding-top:px;
               ">
        <div class ="container">
    <h2>Page not found!</h2>
    <h1>404</h1>
    <h2>We can not find the page you are looking for.</h2>
    <v-btn v-bind:to="`/movies`">Back</v-btn>

        </div>
 </div>
 
</template>

<style scoped>
    .container{
        width:100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        color: #343434;
    }

    .container h1{
        font-size: 110px;
        margin: 0;
        font-weight: 900;
        letter-spacing: 20px;
        background: white ;
    }

    .container h2{
        /* margin: 0 ; */
        text-align: center;
        font-size: 20px;
        font-weight: 900;
   
    }
</style>