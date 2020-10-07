<template>
  <v-card class="mx-auto" min-width="200" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="title headline">
          <div>{{ solutions.title }}</div>
          <v-chip
            :color="status(solutions.stage.status).color"
            small
            class="ma-2"
          >
            Ожидание
            <v-icon small right>mdi-timelapse</v-icon>
          </v-chip>
        </v-list-item-title>
        <v-list-item-subtitle>{{
          `Создан: ${solutions.date}`
        }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-btn
        :href="`${baseURL}/processes/download?path=${solutions.pathToDocument}`"
        icon
      >
        <v-icon>mdi-file-document</v-icon>
      </v-btn>
    </v-list-item>
    <v-card-text></v-card-text>
    <v-card-actions>
      <dialog-vote
        :id="solutions._id"
        :step="solutions.stage.step"
        :processId="solutions.processId"
        :email="email"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import DialogVote from "../minor/DialogVote.vue";

export default {
  name: "Solution",
  props: {
    solutions: Object,
    email: String,
  },
  components: {
    DialogVote,
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_ROOT_URL,
    };
  },
  methods: {
    status(s) {
      if (s === "progress")
        return {
          text: "Ожидание",
          color: "grey lighten-2",
        };
      if (s === "За")
        return {
          text: "За",
          color: "success",
        };
      if (s === "Против")
        return {
          text: "Против",
          color: "error",
        };
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
}
</style>