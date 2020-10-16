<template>
  <v-card class="mx-auto" min-width="200" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="title headline">
          <div>{{ solutions.title }}</div>
          <v-chip :color="status(solutions.vote).color" small class="ma-2">
            {{ status(solutions.vote).text }}
            <v-icon small right>{{ status(solutions.vote).icon }}</v-icon>
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
        :step="solutions.step"
        :processId="solutions.processId"
        :author="solutions.author"
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
      if (s === "waiting")
        return {
          text: "Ожидание",
          color: "grey lighten-2",
          icon: "mdi-timelapse",
        };
      if (s === "approve")
        return {
          text: "Согласован",
          color: "success",
          icon: "mdi-checkbox-marked-circle-outline",
        };
      if (s === "refusal")
        return {
          text: "Возврат",
          color: "error",
          icon: "mdi-redo-variant",
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