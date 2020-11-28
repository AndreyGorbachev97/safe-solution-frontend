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
    </v-list-item>
    <v-card-text>
      <stepper :stages="process.stages" />
    </v-card-text>
    <v-card-actions>
      <v-btn text :to="`/processes/${process._id}`" color="primary"
        >Подробнее</v-btn
      >
      <v-spacer />
      <v-btn
        :href="`${baseURL}/processes/download?path=${process.pathToDocument}`"
        icon
      >
        <v-icon>mdi-file-eye</v-icon>
      </v-btn>
      <v-btn
        v-if="process.stages.slice(-1)[0].status === 'success'"
        target="_blank"
        :href="`${baseURL}/processes/download?path=${process.pathToDocument}`"
        icon
      >
        <v-icon>mdi-file-download</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import Stepper from "../minor/Stepper.vue";
export default {
  name: "Process",
  props: {
    process: Object,
    download: Function,
  },
  components: {
    Stepper,
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_ROOT_URL,
    };
  },
  methods: {
    ...mapActions(["getProcess"]),
  },
};
</script>

<style scoped>
</style>