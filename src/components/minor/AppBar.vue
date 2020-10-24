<template>
  <div>
    <v-app-bar elevation="0" color="primary" dark>
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

    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list dense two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="orange" size="40">
              <span class="white--text">{{
                userData.name ? userData.name[0].toUpperCase() : ""
              }}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              `${userData.name} ${userData.surname}`
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav dense>
        <v-list-item-group v-model="group" color="primary">
          <v-list-item link to="/processes">
            <v-list-item-content>
              <v-list-item-title>Мои процессы</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/solutions">
            <v-list-item-content>
              <v-list-item-title>Мои участия в процессах</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/collegues">
            <v-list-item-content>
              <v-list-item-title>Коллеги</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/process-create">
            <v-list-item-content>
              <v-list-item-title>Создание процесса</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
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
  display: flex;
  justify-content: space-between;
}
.title {
  color: white;
  text-decoration: none;
}
</style>
