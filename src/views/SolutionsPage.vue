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
          <solution :solutions="item" :email="userData.email" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Solution from "../components/cards/Solution.vue";

export default {
  name: "SolutionsPage",
  mounted() {
    this.getListSolutions();
  },
  computed: mapGetters(["listSolutions", "userData"]),
  methods: mapActions(["getListSolutions"]),
  components: {
    Solution,
  },
};
</script>

<style>
</style>