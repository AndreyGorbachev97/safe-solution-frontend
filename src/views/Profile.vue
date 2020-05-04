<template>
  <div class="home">
    <v-row no-gutters v-if="userData.name">
      <v-col lg="4" md="6" sm="8" xs="12">
        <v-container>
          <card-profile :userData="userData" />
        </v-container>
      </v-col>
      <v-col lg="8" md="6" sm="8" xs="12">
        <v-container>
          <v-row no-gutters v-if="userData.name">
            <v-col
              lg="4"
              md="4"
              sm="6"
              xs="6"
              v-for="(item, i) in process"
              :key="i"
              class="pr-3 pb-3"
            >
              <processes :userData="userData" />
            </v-col>
            <v-col lg="4" md="4" sm="6" xs="6" class="pr-3 pb-3">
              <v-card class="mx-auto" max-width="344" outlined>
                <v-card-text>
                  <div style>
                    <v-icon>mdi-plus</v-icon>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardProfile from "../components/childProfile/CardProfile.vue";
import Processes from "../components/childProfile/Processes.vue";

export default {
  name: "Home",
  components: { CardProfile, Processes },
  mounted() {
    this.getStartData();
  },
  computed: mapGetters(["userData", "isAuthenticated"]),
  data() {
    return {
      process: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    ...mapActions(["getUserData"]),
    async getStartData() {
      await this.getUserData();
      if (!this.isAuthenticated) {
        this.$router.push("/auth");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
