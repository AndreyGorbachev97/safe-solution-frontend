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
  async mounted() {
    await this.getListSolutions();
    console.log('listSolutions', this.listSolutions);
    this.roomConnect();
  },
  computed: mapGetters(["listSolutions", "userData"]),
  methods: {
    ...mapActions(["getListSolutions"]),
    roomConnect(){
      const rooms = this.listSolutions
      .reduce((acc, el) => acc.find((r) => r === el.processId) ? acc : [...acc, el.processId], []);
      rooms.forEach((el) => {
        this.$socket.emit('solution', {name: '33', room: el}, data => {
        if (typeof data === 'string') {
          console.error(data);
        } else { 
          console.log('data:', data);
        }
      })
    })
    },
  },
  components: {
    Solution,
  },
};
</script>

<style>
</style>