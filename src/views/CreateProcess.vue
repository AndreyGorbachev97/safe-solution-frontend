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
      <!-- <v-btn href="http://localhost:3000/processes/download" color="primary">Download</v-btn> -->
    </v-form>
    <div class="ma-2 text--secondary">
      {{ file ? "Документ для согласования: " + file.get("file").name : "" }}
    </div>
    <v-timeline reverse>
      <v-timeline-item
        v-for="(process, i) in stages"
        :key="i"
        :color="i === stages.length - 1 ? 'blue-grey lighten-3' : 'light-blue'"
        :icon="i === stages.length - 1 ? 'mdi-pencil' : 'mdi-check-all'"
        large
      >
        <template v-slot:opposite>
          <span>Stage {{ i + 1 }}</span>
        </template>
        <v-card class="elevation-2">
          <v-card-text>
            <div class="action-btn mb-3">
              <v-slider
                style="width: 100%"
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
              <v-spacer></v-spacer>
              <v-btn
                class="ml-3"
                @click="deleteStage"
                v-if="i !== 0 && i === stages.length - 1"
                icon
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
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
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <div class="buttons-center">
      <v-btn
        class="ma-2 fix-width"
        :disabled="!stages[0].participant[0] || !valid"
        color="primary"
        @click="createProcess({ title: name, stages: modStages, file })"
        >Create process</v-btn
      >
      <v-btn
        class="ma-2 fix-width"
        :disabled="!stages[stages.length - 1].participant[0]"
        @click="addStage"
        color="primary"
        >Add stage</v-btn
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
    ...mapGetters(["colleaguesList"]),
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
    deleteStage() {
      this.stages.splice(-1);
    },
  },
};
</script>

<style scoped>
.action-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttons-center {
  display: flex;
  justify-content: center;
}
.fix-width {
  width: 150px;
}
.timeline-item {
  padding: 0;
}
.form-block {
  display: flex;
  align-items: center;
}
</style>
