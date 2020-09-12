<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-form ref="form" v-model="valid">
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="8" class="pl-12">
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
                <div class="action-btn">
                  <v-switch
                    v-if="i === stages.length - 1"
                    v-model="stages[i].logicalOperation"
                    :label="stages[i].logicalOperation ? 'or' : 'and'"
                  ></v-switch>
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
                  flat
                  solo
                  hide-details
                  hide-selected
                  deletable-chips
                  :items="colleaguesList"
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
            @click="createProcess({title: name, stages: modStages})"
          >Create process</v-btn>
          <v-btn
            class="ma-2 fix-width"
            :disabled="!stages[stages.length - 1].participant[0]"
            @click="addStage"
            color="primary"
          >Add stage</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CreateProcess",
  mounted() {
    this.getColleagues("dstu");
  },
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      operationOr: true,
      stages: [
        {
          participant: [],
          logicalOperation: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["colleaguesList"]),
    modStages() {
      return this.stages.map((el) => ({
        participant: el.participant.map((el) => ({
          email: el,
          vote: "waiting",
        })),
      }));
    },
  },
  methods: {
    ...mapActions(["createProcess", "getColleagues"]),
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
</style>
