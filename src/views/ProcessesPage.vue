<template>
  <div class="home">
    <v-container>
      <v-row no-gutters>
        <v-col lg="4" md="6" sm="6" xs="6" class="pr-3 pb-3">
          <v-card
            style="height: 100%; min-height: 150px"
            class="mx-auto"
            min-width="250"
            outlined
            @click="redirect"
          >
            <v-card-text class="add-card">
              <div>
                <v-icon size="35">mdi-plus</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          lg="4"
          md="6"
          sm="6"
          xs="6"
          v-for="(item, i) in listProcesses"
          :key="i"
          class="pr-3 pb-3"
        >
          <process :process="item" :download="downloadFile" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Process from "../components/cards/Process.vue";

export default {
  name: "ProcessesView",
  components: { Process },
  mounted() {
    this.message();
    this.getListProcesses();
  },
  sockets: {},
  computed: {
    ...mapGetters(["userData", "isAuthenticated", "listProcesses"]),
    processes() {
      return this.userData.processes;
    },
    solutions() {
      return this.userData.solutions;
    },
  },
  methods: {
    ...mapActions(["getListProcesses", "downloadFile"]),
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
  height: 100%;
  background-color: rgba(100, 100, 100, 0.3);
  cursor: pointer;
}
.add-card:hover {
  background-color: rgba(100, 100, 100, 0.4);
}
.card-profile {
  position: sticky;
  top: 0;
}
</style>
