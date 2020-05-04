<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field v-model="password" :rules="lengthRules" label="password" required></v-text-field>
    <div class="button-block">
      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit">join</v-btn>
      <v-btn color="primary" class="mr-4" @click="reset">Reset</v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RegisterForm",
  computed: mapGetters(["login"]),
  data: () => ({
    valid: true,
    lazy: false,
    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    lengthRules: [
      v => !!v || "Name is required",
      v => (v && v.length >= 8) || "short password"
    ]
  }),

  methods: {
    ...mapActions(["logIn"]),
    async submit() {
      await this.logIn({ email: this.email, password: this.password });
      if (this.login) {
        this.$router.push("/home");
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
.button-block {
  margin-top: 10px;
}
</style>
