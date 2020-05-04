<template>
  <div class="container">
    <v-row class="mb-6" no-gutters justify="center">
      <v-col lg="4" md="6" sm="8" xs="12">
        <v-card class="mx-auto" elevation="10">
          <v-img :src="require('../assets/auth.svg')" height="200px" contain></v-img>
          <v-card-text>
            <v-tabs fixed-tabs>
              <v-tab>Log in</v-tab>
              <v-tab>sign up</v-tab>
              <v-tab-item>
                <authorization-form />
              </v-tab-item>
              <v-tab-item>
                <register-form />
              </v-tab-item>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuthorizationForm from "../components/forms/AuthorizationForm.vue";
import RegisterForm from "../components/forms/RegisterForm.vue";
export default {
  name: "AuthorizationView",
  components: { AuthorizationForm, RegisterForm }
};
</script>

<style lang="scss" scoped>
.tabs {
  border-bottom: solid 1px red;
}
</style>
