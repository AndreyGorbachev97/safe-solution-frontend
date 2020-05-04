<template>
  <v-card height="75vh">
    <v-container class="head-container">
      <v-avatar style="margin-left: 20px" color="orange" size="90">
        <span class="white--text headline">
          {{
          userData.name[0].toUpperCase()
          }}
        </span>
      </v-avatar>
      <div class="name-container">
        <div>{{ `${userData.name} ${userData.surname}` }}</div>
      </div>
    </v-container>

    <v-container class="data">
      <v-list two-line>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-phone</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ userData.phone }}</v-list-item-title>
            <v-list-item-subtitle>Mobile</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon>mdi-message-text</v-icon>
          </v-list-item-icon>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-email</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ userData.email }}</v-list-item-title>
            <v-list-item-subtitle>Personal</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "CardProfile",
  props: {
    userData: Object
  }
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