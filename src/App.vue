<template>
  <v-app style="background-color: #FAFAFA">
    <app-bar />
    <v-content class="content">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";

export default {
  name: "App",
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  components: {
    AppBar
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
.content {
  margin: 2% 4% 0;
}
</style>
