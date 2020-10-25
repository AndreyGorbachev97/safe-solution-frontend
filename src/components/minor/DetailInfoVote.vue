<template>
  <v-menu v-if="item" offset-y top v-model="menu">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small :color="color[item.vote]" dark fab v-bind="attrs" v-on="on">
        <v-icon dark> {{ image[item.vote] }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="header">
          <v-avatar
            size="40"
            class="mr-2"
            style="color: white"
            color="primary"
            left
          >
            {{ item.name[0].toUpperCase() }}
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ `${item.name} ${item.surname}` }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </div>
        <v-divider />
        <div class="mt-2">
          <div>
            Решение: {{textStatus[item.vote]}}
            <v-icon small :color="color[item.vote]" dark> {{ image[item.vote] }}</v-icon>
          </div>
          <div>
            Комментарий: {{item.comment ? item.comment : "-"}}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "DetailInfoVote",
  props: {
    item: Object,
  },
  data() {
    return {
      menu: false,
      color: {
        approve: "success",
        refusal: "error",
        waiting: "#E0E0E0",
      },
      image: {
        approve: "mdi-checkbox-marked-circle-outline",
        refusal: "mdi-redo-variant",
        waiting: "mdi-timelapse",
      },
      textStatus: {
        approve: "согласовал",
        refusal: "вернул автору",
        waiting: "ожидание",
      },
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
</style>