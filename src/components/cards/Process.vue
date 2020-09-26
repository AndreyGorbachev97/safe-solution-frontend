<template>
  <v-card style="height: 180px" class="mx-auto" min-width="200" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{process.title}}
          <v-btn :href="`${baseURL}/processes/download?path=${process.pathToDocument}`" icon>
            <v-icon>mdi-file-document</v-icon>
          </v-btn>
        </v-list-item-title>
        <v-list-item-subtitle>{{`Дата создания: ${process.date}`}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <div class="stepper">
        <v-avatar color="success" size="26">
          <span class="white--text">1</span>
        </v-avatar>
        <v-divider />
        <v-avatar color="success" size="26">
          <span class="white--text">2</span>
        </v-avatar>
        <v-divider />
        <v-avatar color="amber" size="26">
          <v-icon>mdi-timelapse</v-icon>
        </v-avatar>
        <v-divider />
        <v-avatar color="grey lighten-2" size="26">
          <span class="white--text">4</span>
        </v-avatar>
        <v-divider />
        <v-avatar color="grey lighten-2" size="26">
          <span class="white--text">5</span>
        </v-avatar>
        <v-divider />
        <v-avatar color="grey lighten-2" size="26">
          <span class="white--text">6</span>
        </v-avatar>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary">Подробнее</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
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
};
</script>

<style scoped>
.stepper {
  display: flex;
  align-items: center;
}
</style>