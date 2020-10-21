<template>
  <div>
    <v-form ref="form" v-model="valid" class="form-block">
      <v-text-field
        hide-details
        single-line
        dense
        filled
        rounded
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>
      <import-file :addFile="addFile" class="ml-2" />
    </v-form>
    <div class="ma-2 text--secondary">
      {{ file ? "Документ для согласования: " + file.get("file").name : "" }}
    </div>

    <v-card
      v-for="(process, i) in stages"
      :key="i"
      class="elevation-2 mt-5 mb-5"
    >
      <v-card-title>
        <div class="action-btn mb-3">
          {{ `Этап ${i + 1}` }}
          <v-spacer></v-spacer>
          <v-slider
            name="e"
            style="width: 60%"
            v-if="stages[i].participant[1]"
            v-model="stages[i].percentageVotes"
            hide-details
            dense
            thumb-label
            :label="`Мин. % голосов`"
            :step="100 / stages[i].participant.length"
            :min="100 / stages[i].participant.length"
            :max="100"
            ticks="always"
            tick-size="4"
          >
            <template v-slot:thumb-label="{ value }">
              {{ value.toFixed(1) }}
            </template>
          </v-slider>
          <v-btn
            class="ml-3"
            @click="deleteStage"
            v-if="i !== 0 && i === stages.length - 1"
            icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="stages[i].participant"
          v-on:change="minPercentageVotes(i)"
          flat
          solo
          hide-details
          hide-selected
          deletable-chips
          :items="colleaguesList.map((el) => el.email)"
          label="Add members"
          multiple
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click="data.select"
              @click:close="deleteItem(i, data.item)"
            >
              <v-avatar style="color: white" color="primary" left>
                {{ data.item[0].toUpperCase() }}
              </v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-autocomplete>
      </v-card-text>
    </v-card>
    <div class="buttons-center">
      <v-btn
        class="ma-2 fix-width"
        :disabled="!stages[0].participant[0] || !valid || !file"
        color="primary"
        @click="save()"
        >Создать процесс</v-btn
      >
      <v-btn
        class="ma-2 fix-width"
        :disabled="!stages[stages.length - 1].participant[0]"
        @click="addStage"
        color="primary"
        >Добавить этап</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ImportFile from "../components/minor/ImportFile.vue";
export default {
  name: "CreateProcess",
  components: {
    ImportFile,
  },
  mounted() {
    //исправить
    this.getColleagues("dstu");
  },
  data() {
    return {
      file: "",
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      operationOr: true,
      stages: [
        {
          participant: [],
          percentageVotes: 0,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["colleaguesList", "userData"]),
    modStages() {
      return this.stages.map((el, i) => ({
        percentageVotes: el.percentageVotes,
        status: i === 0 ? "inWork" : "waiting",
        participant: el.participant.map((el) => ({
          email: el,
          vote: "waiting",
          comment: "",
          userId: this.colleaguesList.find((user) => user.email === el).userId,
        })),
      }));
    },
  },
  methods: {
    ...mapActions(["createProcess", "getColleagues"]),
    async save() {
      await this.createProcess({
        title: this.name,
        stages: this.modStages,
        file: this.file,
      });
      const ids = this.modStages
        .reduce(
          (acc, el) => [...acc, ...el.participant.map((p) => p.userId)],
          []
        )
        .reduce((acc, el) => {
          if (!acc.find((id) => id === el)) acc.push(el);
          return acc;
        }, []);
      this.$socket.emit(
        "process",
        { ids, user: this.userData, status: "creacte process" },
        (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            console.log("data:", data);
          }
        }
      );
      this.$router.push("/");
    },
    addFile(file) {
      this.file = file;
    },
    minPercentageVotes(index) {
      this.stages[index].percentageVotes =
        100 / this.stages[index].participant.length;
    },
    addStage() {
      if (this.stages[this.stages.length - 1].participant[0]) {
        this.stages = [
          ...this.stages,
          { participant: [], logicalOperation: true },
        ];
      }
    },
    deleteItem(i, item) {
      const index = this.stages[i].participant.indexOf(item);
      if (index >= 0) this.stages[i].participant.splice(index, 1);
    },
    deleteStage() {
      this.stages.splice(-1);
    },
  },
};
</script>

<style scoped>
.action-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttons-center {
  display: flex;
  justify-content: flex-end;
}
/* .fix-width {
  width: 160px;
} */
.timeline-item {
  padding: 0;
}
.form-block {
  display: flex;
  align-items: center;
}
</style>
