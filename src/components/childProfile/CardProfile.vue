<template>
  <v-card height="75vh">
    <v-card-text class="data">
      <v-list dense two-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="orange" size="40">
              <span class="white--text">{{userData.name[0].toUpperCase()}}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ `${userData.name} ${userData.surname}` }}</v-list-item-title>
            <v-list-item-subtitle>{{ `Почта: ${userData.email}` }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Мои процессы</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Мои участия в процессах</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CardProfile",
  props: {
    userData: Object,
  },
};
</script>

<style lang="scss" scoped>
.data {
  padding: 0;
}
.head-container {
  display: flex;
}
.name-container {
  padding: 0% 6%;
  font-size: 25px;
}
</style>