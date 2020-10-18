<template>
  <v-data-table
    class="ma-3"
    :headers="headers"
    :items="colleaguesList"
    item-key="name"
  ></v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ColleaguesPage",
  mounted() {
    //исправить
    this.getColleagues("dstu");
  },
  data() { 
    return { 
      headers: [
        {
          text: 'Имя',
          align: 'start',
          value: 'name',
        },
        { text: 'Фамилия', value: 'surname' },
        { text: 'Почта', value: 'email' },
      ],
    };
  },
  computed: mapGetters(["colleaguesList"]),
  methods: mapActions(["getColleagues"]),
};
</script>