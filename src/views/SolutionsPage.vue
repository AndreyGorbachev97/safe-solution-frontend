<template>
  <div class="home">
    <v-container>
      <v-row no-gutters>
        <v-col
          lg="4"
          md="6"
          sm="6"
          xs="6"
          v-for="(item, i) in listSolutions"
          :key="i"
          class="pr-3 pb-3"
        >
          <process :process="item" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Process from "../components/childProfile/Process.vue";

export default {
  name: "SolutionsPage",
  mounted() {
    this.getListSolutions();
  },
  computed: mapGetters(["listSolutions"]),
  methods: mapActions(["getListSolutions"]),
  components: {
    Process,
  },
};
</script>

<style>
</style>