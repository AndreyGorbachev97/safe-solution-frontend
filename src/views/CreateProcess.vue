<template>
  <div>
    <v-timeline>
      <v-timeline-item
        v-for="(process, i) in stages"
        :key="i"
        :color="i === stages.length - 1 ? 'blue-grey lighten-3' : 'light-blue'"
        :icon="i === stages.length - 1 ? 'mdi-pencil' : 'mdi-check-all'"
        large
      >
        <template v-slot:opposite>
          <span>Stage {{i + 1}}</span>
        </template>
        <v-card class="elevation-2">
          <v-card-text>
            <div class="action-btn">
              <v-switch
                v-if="i === stages.length - 1"
                v-model="stages[i].logicalOperation"
                :label="stages[i].logicalOperation ? 'or': 'and'"
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
            <v-combobox
              v-model="stages[i].participant"
              flat
              solo
              hide-details
              hide-selected
              :items="['aa@g.ru']"
              label="Add members"
              multiple
              chips
            ></v-combobox>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <div class="buttons-center">
      <v-btn
        class="ma-2 fix-width"
        :disabled="!stages[0].participant[0]"
        color="primary"
        @click="createProcess(stages)"
      >Create process</v-btn>
      <v-btn
        class="ma-2 fix-width"
        :disabled="!stages[stages.length - 1].participant[0]"
        @click="addStage"
        color="primary"
      >Add stage</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "CreateProcess",
  data() {
    return {
      operationOr: true,
      stages: [
        {
          participant: [],
          logicalOperation: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions(['createProcess']),
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
</style>