<template>
  <v-card height="100vh">
    <v-card-text class="data">
      <v-list dense two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="orange" size="40">
              <span class="white--text">{{userData.name ? userData.name[0].toUpperCase() : ''}}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ `${userData.name} ${userData.surname}` }}</v-list-item-title>
            <v-list-item-subtitle>{{userData.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item link to="processes">
            <v-list-item-content>
              <v-list-item-title>Мои процессы</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="solutions">
            <v-list-item-content>
              <v-list-item-title>Мои участия в процессах</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Коллеги</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="process-create">
            <v-list-item-content>
              <v-list-item-title>Создание процесса</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SideBar",
  computed: mapGetters(["userData"]),
};
</script>

<style scoped>
</style>