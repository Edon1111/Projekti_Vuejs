<template>
  <div class="container">
    <v-img
      src="https://thumbs.gfycat.com/AnotherAmazingBirdofparadise-size_restricted.gif"
      v-model="width"
      max="200px"
    ></v-img>

    <h1><strong>Page not found!</strong></h1>

    <v-btn rounded color="red darken-4" v-bind:to="`/`">Back</v-btn>
  </div>
</template>
<style scoped>
container {
  position: fixed;
}
</style>
