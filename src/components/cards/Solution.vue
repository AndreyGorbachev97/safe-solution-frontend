<template>
  <v-card class="mx-auto" min-width="200" max-width="400">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">
          <div>{{ solutions.title }}</div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      Статус:
      <v-chip :color="status(solutions.vote).color" small class="ma-2">
        {{ status(solutions.vote).text }}
        <v-icon small right>{{ status(solutions.vote).icon }}</v-icon>
      </v-chip>
      <div>
        {{ `Создан: ${solutions.date}` }}
      </div>
      <div>
        {{ `Обработан: ${solutions.dateVote || "-"}` }}
      </div>
    </v-card-text>
    <v-card-actions>
      <dialog-vote
        :status="solutions.vote"
        :id="solutions._id"
        :step="solutions.step"
        :processId="solutions.processId"
        :author="solutions.author"
        :email="email"
        :name="name"
        :surname="surname"
      />
      <v-spacer />
      <v-btn
        :href="`${baseURL}/processes/download?path=${solutions.pathToDocument}`"
        icon
      >
        <v-icon>mdi-file-eye</v-icon>
      </v-btn>
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
    name: String,
    surname: String,
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