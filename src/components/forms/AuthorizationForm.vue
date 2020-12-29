<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Почта"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="lengthRules"
      label="Пароль"
      required
    ></v-text-field>
    <div class="button-block">
      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit"
        >Далее</v-btn
      >
      <v-btn color="primary" class="mr-4" @click="reset">Сброс</v-btn>
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
      (v) => !!v || "Обязательное поле",
      (v) => /.+@.+\..+/.test(v) || "Не верный формат почты",
    ],
    lengthRules: [
      (v) => !!v || "Обязательное поле",
      (v) => (v && v.length >= 8) || "Короткий пароль",
    ],
  }),

  methods: {
    ...mapActions(["logIn", "checkAuth", "getUserData"]),
    async submit() {
      await this.logIn({ email: this.email, password: this.password });
      if (this.login) {
        await this.checkAuth();
        this.$router.push("/");
      }
      this.getUserData();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.button-block {
  margin-top: 10px;
}
</style>
