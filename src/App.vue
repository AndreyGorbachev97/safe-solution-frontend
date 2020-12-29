<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-content>
      <v-row no-gutters>
        <side-bar />
        <div style="width: 100%">
          <router-view class="content" />
        </div>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import SideBar from "./components/minor/SideBar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    SideBar,
  },
  mounted() {
    this.getUser();
  },
  computed: {
    ...mapGetters(["userData"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions(["getUserData"]),
    async getUser() {
      await this.getUserData();
      if (!this.userData.email) {
        this.$router.push("/auth");
      }
    },
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.content {
  padding: 2% 3% 0;
}
.col-right {
  background-color: white;
}
</style>
