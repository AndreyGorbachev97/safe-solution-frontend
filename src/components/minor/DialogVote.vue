<template>
  <div>
    <v-btn
      color="primary"
      :disabled="status !== 'waiting'"
      text
      @click.stop="dialog = true"
    >
      Обработать
    </v-btn>

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
import moment from "moment";

export default {
  props: {
    status: String,
    id: String,
    email: String,
    name: String,
    surname: String,
    step: Number,
    processId: String,
    author: Object,
  },
  data() {
    return {
      valid: true,
      dialog: false,
      vote: "",
      modVote: "",
      comment: "",
      itemsVote: ["Согласовать", "Вернуть на доработку"],
    };
  },
  watch: {
    vote() {
      console.log("test");
      this.modVote = this.vote === "Согласовать" ? "approve" : "refusal";
    },
  },
  methods: {
    ...mapActions(["addVote"]),
    async changeVote() {
      await this.addVote({
        id: this.id,
        email: this.email,
        name: this.name,
        surname: this.surname,
        step: this.step,
        processId: this.processId,
        vote: this.modVote,
        dateVote: moment(new Date()).format("lll"),
        comment: this.comment,
      });
      this.$socket.emit("answersSolutionRoom", {
        room: this.processId,
        author: this.author,
      });
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>