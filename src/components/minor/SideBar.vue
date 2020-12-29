<template>
  <div>
    <v-app-bar app class="appbar" elevation="0" color="primary" dark>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="openDrawer"
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
    <v-navigation-drawer
      :app="!minDrawer"
      :permanent="!minDrawer"
      :fixed="minDrawer"
      :value="isOpen"
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      dark
      :width="minDrawer ? null : isOpen ? 245 : 58"
    >
      <div class="nav">
        <div>
          <v-list dense two-line>
            <v-list-item class="px-2">
              <v-list-item-avatar color="amber">
                <v-btn icon to="/">
                  <span class="white--text">{{
                    userData.name ? userData.name[0].toUpperCase() : ""
                  }}</span>
                </v-btn>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{
                  `${userData.name} ${userData.surname}`
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  userData.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-list dense nav>
            <v-list-item-group color="white">
              <v-list-item link to="/processes">
                <v-list-item-icon class="item-icon">
                  <v-icon>mdi-book-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Мои процессы</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link to="/solutions">
                <v-list-item-icon class="item-icon">
                  <v-icon>mdi-book-clock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Требующие оброботки</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link to="/collegues">
                <v-list-item-icon class="item-icon">
                  <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Коллеги</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link to="/process-create">
                <v-list-item-icon class="item-icon">
                  <v-icon>mdi-book-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Создание процесса</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
        <div>
          <v-list dense nav>
            <tooltip hint="Сменить тему" position="right">
              <v-list-item class="mb-1" @click="changeTheme">
                <v-list-item-icon class="ml-n2 item-icon">
                  <v-icon class="mx-2" v-if="theme">mdi-brightness-4</v-icon>
                  <v-icon class="mx-2" v-else>mdi-brightness-7</v-icon>
                </v-list-item-icon>
                <v-list-item-content> </v-list-item-content>
              </v-list-item>
            </tooltip>
            <v-divider></v-divider>
            <tooltip hint="Развернуть" :disabled="isOpen" position="right">
              <v-list-item class="mt-1" @click="openDrawer">
                <v-list-item-content>
                  <v-list-item-title class="item-title" v-if="isOpen">
                    Свернуть
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon class="ml-n2">
                  <v-icon
                    >mdi-chevron-double-{{ isOpen ? "left" : "right" }}</v-icon
                  >
                </v-list-item-icon>
              </v-list-item>
            </tooltip>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tooltip from "./Tooltip";

export default {
  name: "SideBar",
  components: {
    Tooltip,
  },
  created() {
    window.addEventListener("resize", this.updateWidth);
  },
  data() {
    return {
      isOpen: JSON.parse(localStorage.getItem("drawer")),
      width: window.innerWidth,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "userData"]),
    minDrawer() {
      return this.width < 960;
    },
    theme() {
      return this.$vuetify.theme.dark;
    },
  },
  methods: {
    changeTheme() {
      const theme = !this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = theme;
      localStorage.setItem("theme", JSON.stringify(theme));
    },
    updateWidth() {
      console.log(window.innerWidth);
      this.width = window.innerWidth;
    },
    openDrawer() {
      const drawer = !this.isOpen;
      this.isOpen = drawer;
      localStorage.setItem("drawer", JSON.stringify(drawer));
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
</style>