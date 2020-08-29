<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>
        <div>
          <router-link class="title" to="/home">Home</router-link>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn to="tasks" text class="ma-2 white--text">
        tasks
        <v-icon right>mdi-table-edit</v-icon>
      </v-btn>

      <v-btn v-if="!isAuthenticated" to="auth" text class="ma-2 white--text">
        sign in
        <v-icon right>mdi-account</v-icon>
      </v-btn>
      <v-btn v-else to="auth" @click="exit" text class="ma-2 white--text">
        sign out
        <v-icon right>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppBar",
  mounted() {
    // this.getStartData();
  },
  computed: mapGetters(["isAuthenticated"]),
  methods: {
    ...mapActions(["logOut", "getUserData"]),
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
