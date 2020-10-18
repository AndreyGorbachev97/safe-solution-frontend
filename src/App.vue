<template>
  <v-app style="background-color: #fafafa">
    <v-content>
      <v-row no-gutters>
        <v-col v-if="isAuthenticated" lg="3" md="4" class="hidden-sm-and-down">
          <side-bar class="sidebar" />
        </v-col>
        <v-col
          :lg="isAuthenticated ? 9 : 12"
          :md="isAuthenticated ? 8 : 12"
          sm="12"
          xs="12"
        >
          <app-bar />
          <router-view class="content" />
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import SideBar from "./components/minor/SideBar.vue";
import AppBar from "./components/minor/AppBar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    SideBar,
    AppBar,
  },
  mounted() {
    this.getUserData();
  },
  computed: mapGetters(["isAuthenticated"]),
  methods: mapActions(["getUserData"]),
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.content {
  padding: 2% 3% 0;
}
.appbar {
  z-index: 1000;
  position: sticky;
  top: 0;
}
.sidebar {
  position: sticky;
  height: 100vh;
  top: 0;
}
.col-right {
  background-color: white;
}
</style>
