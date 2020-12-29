<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-container class="double-field">
      <v-text-field
        class="mr-2"
        v-model="name"
        :rules="requiredRules"
        label="Имя"
        required
      ></v-text-field>
      <v-text-field
        v-model="surname"
        :rules="requiredRules"
        label="Фамилия"
        required
      ></v-text-field>
    </v-container>

    <v-container class="double-field">
      <v-text-field
        class="mr-2"
        v-model="email"
        :rules="emailRules"
        label="Почта"
        required
      ></v-text-field>
      <v-text-field
        v-model="entity"
        label="Организация"
        required
      ></v-text-field>
    </v-container>

    <v-container class="double-field">
      <v-text-field
        class="mr-2"
        v-model="password"
        :rules="lengthRules"
        label="Пароль"
        required
      ></v-text-field>
      <v-text-field
        v-model="repeat"
        :rules="lengthRules"
        label="Повторите пароль"
        required
      ></v-text-field>
    </v-container>

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
import { mask } from "vue-the-mask";

export default {
  name: "RegisterForm",
  directives: { mask },
  computed: mapGetters(["registration"]),
  data: () => ({
    valid: true,
    lazy: false,
    name: "",
    surname: "",
    entity: "",
    email: "",
    password: "",
    repeat: "",
    emailRules: [
      (v) => !!v || "Обязательное поле",
      (v) => /.+@.+\..+/.test(v) || "Не верный формат почты",
    ],
    lengthRules: [
      (v) => !!v || "Обязательное поле",
      (v) => (v && v.length >= 8) || "Короткий пароль",
    ],
    requiredRules: [(v) => !!v || "Обязательное поле"],
  }),

  methods: {
    ...mapActions(["register", "checkAuth", "getUserData"]),
    async submit() {
      await this.register({
        name: this.name,
        email: this.email,
        password: this.password,
        surname: this.surname,
        //исправить на entity: this.entity,
        entity: "dstu",
      });
      if (this.registration) {
        await this.checkAuth();
        await this.getUserData();
        this.$router.push("/");
      }
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
.double-field {
  display: flex;
  justify-content: space-around;
  padding: 0;
}
</style>
