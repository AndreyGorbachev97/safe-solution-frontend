<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-container class="double-field">
      <v-text-field
        class="mr-2"
        v-model="name"
        :rules="requiredRules"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="surname"
        :rules="requiredRules"
        label="Surname"
        required
      ></v-text-field>
    </v-container>

    <v-container class="double-field">
      <v-text-field
        class="mr-2"
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="entity"
        label="Organization"
        required
      ></v-text-field>
    </v-container>

    <v-container class="double-field">
      <v-text-field
        class="mr-2"
        v-model="password"
        :rules="lengthRules"
        label="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="repeat"
        :rules="lengthRules"
        label="repeat password"
        required
      ></v-text-field>
    </v-container>

    <div class="button-block">
      <v-btn :disabled="!valid" color="primary" class="mr-4" @click="submit"
        >join</v-btn
      >
      <v-btn color="primary" class="mr-4" @click="reset">Reset</v-btn>
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
      (v) => !!v || "is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    lengthRules: [
      (v) => !!v || "is required",
      (v) => (v && v.length >= 8) || "short password",
    ],
    requiredRules: [(v) => !!v || "is required"],
  }),

  methods: {
    ...mapActions(["register"]),
    async submit() {
      await this.register({
        name: this.name,
        email: this.email,
        password: this.password,
        surname: this.surname,
        entity: this.entity,
      });
      if (this.registration) {
        this.$router.push("/home");
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
