<template>
  <div>
    <v-app-bar app class="appbar" elevation="0" color="primary" dark>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="openDrawer"
      ></v-app-bar-nav-icon>
      <v-spacer />
      <v-btn v-if="!userData.email" to="auth" text class="ma-2 white--text">
        Войти
        <v-icon right>mdi-account</v-icon>
      </v-btn>
      <v-btn v-else @click="exit" text class="ma-2 white--text">
        Выйти
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-btn icon @click="changeTheme">
        <v-icon class="mx-2" v-if="theme">mdi-brightness-4</v-icon>
        <v-icon class="mx-2" v-else>mdi-brightness-7</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-if="userData.email"
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
              <tooltip
                v-for="(item, i) in items"
                :key="i"
                :hint="item.hint"
                :disabled="isOpen"
                position="right"
              >
                <v-list-item class="mt-1" link :to="item.to">
                  <v-list-item-icon class="item-icon">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.hint }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </tooltip>
            </v-list-item-group>
          </v-list>
        </div>
        <div>
          <v-list dense nav>
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
import { mapGetters, mapActions } from "vuex";
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
      items: [
        {
          hint: "Мои процессы",
          to: "/processes",
          icon: "mdi-book-multiple",
        },
        {
          hint: "Требующие оброботки",
          to: "/solutions",
          icon: "mdi-book-clock",
        },
        {
          hint: "Коллеги",
          to: "/collegues",
          icon: "mdi-account-multiple",
        },
        {
          hint: "Создание процесса",
          to: "/process-create",
          icon: "mdi-book-plus",
        },
      ],
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
    ...mapActions(["logOut", "getUserData"]),
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
    async exit() {
      await this.logOut();
      await this.getUserData();
      this.$router.push("/auth");
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