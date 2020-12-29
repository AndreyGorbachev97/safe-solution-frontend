<template>
  <v-app-bar class="appbar" elevation="0" color="primary" dark>
    <v-app-bar-nav-icon
      v-if="isAuthenticated"
      class="hidden-md-and-up"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-spacer />
    <v-btn v-if="!isAuthenticated" to="auth" text class="ma-2 white--text">
      Войти
      <v-icon right>mdi-account</v-icon>
    </v-btn>
    <v-btn v-else to="auth" @click="exit" text class="ma-2 white--text">
      Выйти
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppBar",
  mounted() {
    this.getStartData();
  },
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: mapGetters(["isAuthenticated", "userData"]),
  methods: {
    ...mapActions(["logOut", "checkAuth"]),
    // async getStartData() {
    //   await this.getUserData();
    //   if (this.isAuthenticated) {
    //     this.$router.push("/home");
    //   }
    // },
    async exit() {
      await this.logOut();
      this.$store.commit("setIsAuthenticated", false);
    },
    async getStartData() {
      await this.checkAuth();
      console.log("test", this.isAuthenticated);
      if (!this.isAuthenticated) {
        this.$router.push("/auth");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.appbar {
  position: fixed;
  z-index: 1;
  top: 0;
}
.title {
  color: white;
  text-decoration: none;
}
</style>
