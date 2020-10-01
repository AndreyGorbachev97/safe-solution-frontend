<template>
  <v-card class="mx-auto" min-width="200" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="title headline">
          <div>{{ solutions.title }}</div>
          <v-chip small class="ma-2">
            Ожидание
            <v-icon small right>mdi-timelapse</v-icon>
          </v-chip>
          <v-btn
            :href="`${baseURL}/processes/download?path=${solutions.pathToDocument}`"
            icon
          >
            <v-icon>mdi-file-document</v-icon>
          </v-btn>
        </v-list-item-title>
        <v-list-item-subtitle>{{
          `Дата создания: ${solutions.date}`
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text></v-card-text>
    <v-card-actions>
      <dialog-vote
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
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
}
</style>