<template>
  <div>
    <v-btn color="primary" text dark @click.stop="dialog = true"
      >Голосовать</v-btn
    >

    <v-dialog v-model="dialog" max-width="490">
      <v-card>
        <v-card-title class="headline">Решение</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-select
              :rules="[(v) => !!v || 'Сделайте выбор']"
              dense
              filled
              rounded
              v-model="vote"
              :items="itemsVote"
              label="Решение"
            ></v-select>
            <v-textarea
              dense
              filled
              rounded
              v-model="comment"
              label="Комментарий"
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :disabled="!valid" color="primary" text @click="changeVote()"
            >Голосовать</v-btn
          >

          <v-btn color="primary" text @click="dialog = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    id: String,
    email: String,
    step: Number,
    processId: String,
  },
  data() {
    return {
      valid: true,
      dialog: false,
      vote: "",
      modVote: '',
      comment: "",
      itemsVote: ["Согласовать", "Вернуть на доработку"],
    };
  },
  watch: {
    vote() {
      console.log("test");
      this.modVote = this.vote === "Согласовать" ? "approve" : "refusal";
    }
  },
  methods: {
    ...mapActions(["addVote"]),
    changeVote() {
      this.addVote({
        id: this.id,
        email: this.email,
        step: this.step - 1,
        processId: this.processId,
        vote: this.modVote,
        comment: this.comment,
      });
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>