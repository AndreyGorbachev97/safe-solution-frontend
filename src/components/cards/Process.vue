<template>
  <v-card class="mx-auto" min-width="200" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          <div>
            {{ process.title }}
          </div>
        </v-list-item-title>
        <v-list-item-subtitle>{{
          `Создан: ${process.date}`
        }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-btn
        :href="`${baseURL}/processes/download?path=${process.pathToDocument}`"
        icon
      >
        <v-icon>mdi-file-document</v-icon>
      </v-btn>
    </v-list-item>
    <v-card-text>
      <stepper :stages="process.stages" />
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary">Подробнее</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Stepper from "../minor/Stepper.vue";
export default {
  name: "Process",
  props: {
    process: Object,
    download: Function,
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_ROOT_URL,
    };
  },
  components: {
    Stepper,
  },
};
</script>

<style scoped>
</style>