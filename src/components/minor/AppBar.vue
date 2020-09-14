<template>
  <div>
    <v-app-bar elevation="0" color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" to="auth" text class="ma-2 white--text">
        sign in
        <v-icon right>mdi-account</v-icon>
      </v-btn>
      <v-btn v-else to="auth" @click="exit" text class="ma-2 white--text">
        sign out
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppBar",
  mounted() {
    this.getStartData();
  },
  computed: mapGetters(["isAuthenticated"]),
  methods: {
    ...mapActions(["logOut", 'checkAuth']),
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
  display: flex;
  justify-content: space-between;
}
.title {
  color: white;
  text-decoration: none;
}
</style>
