<template>
  <v-card class="mx-auto" min-width="200" max-width="400">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="title headline">
          <div>{{solutions.title}}</div>
          <v-chip small class="ma-2">
            Ожидание голоса
            <v-icon small right>mdi-timelapse</v-icon>
          </v-chip>
        </v-list-item-title>
        <v-list-item-subtitle>{{`Дата создания: ${solutions.date}`}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text></v-card-text>
    <v-card-actions>
      <v-btn text color="primary">Голосовать</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Solution",
  props: {
    solutions: Array,
  },
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
}
</style>