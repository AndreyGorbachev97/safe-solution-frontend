<template>
  <div class="home">
    <v-row no-gutters v-if="userData.name">
      <v-col lg="3" md="3" sm="4" xs="12" class="hidden-sm-and-down">
        <v-container class="card-profile">
          <card-profile :userData="userData" />
        </v-container>
      </v-col>
      <v-col lg="9" md="9" sm="12" xs="12">
        <v-container>
          <v-row no-gutters v-if="userData.name">
            <v-col lg="4" md="4" sm="6" xs="6" class="pr-3 pb-3">
              <v-card class="mx-auto" min-width="250" max-width="400" outlined @click="redirect">
                <v-card-text class="add-card">
                  <div>
                    <v-icon size="35">mdi-plus</v-icon>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col
              lg="4"
              md="4"
              sm="6"
              xs="6"
              v-for="(item, i) in userProcesses"
              :key="i"
              class="pr-3 pb-3"
            >
              <process :process="item" />
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
import Process from "../components/childProfile/Process.vue";

export default {
  name: "Home",
  components: { CardProfile, Process },
  mounted() {
    this.getStartData();
    this.message();
  },
  sockets: {},
  computed: {
    ...mapGetters(["userData", "isAuthenticated", "userProcesses"]),
    processes() {
      return this.userData.processes;
    },
    solutions() {
      return this.userData.solutions;
    },
  },
  data() {
    return {
      process: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };
  },
  methods: {
    ...mapActions(["getUserData"]),
    async getStartData() {
      await this.getUserData();
      if (!this.isAuthenticated) {
        this.$router.push("/auth");
      }
    },
    redirect() {
      this.$router.push("/process-create");
    },
    message() {
      this.$socket.emit("createMessage", {
        text: "from client",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  background-color: #e9e9e9;
  cursor: pointer;
}
.add-card:hover {
  background-color: #d8d8d8;
}
.card-profile {
  position: sticky;
  top: 0;
}
</style>
