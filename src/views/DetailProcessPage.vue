<template>
  <div class="stages-block" style="margin: 5%">
    <div class="line"></div>
    <div
      class="stages-block"
      v-for="(stage, i) in currentProcess.stages"
      :key="i"
    >
      <div class="ma-2">Этап {{ i + 1 }}</div>
      <div class="voice-card">
        <div
          class="mb-5 participant"
          v-for="(item, j) in stage.participant"
          :key="j"
        >
          <detail-info-vote :item="item" />
          <v-divider
            style="width: 20px"
            v-if="j !== stage.participant.length - 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DetailInfoVote from "../components/minor/DetailInfoVote.vue";

export default {
  name: "DetailProcessPage",
  components: {
    DetailInfoVote,
  },
  mounted() {
    this.getProcess(this.$router.history.current.params.id);
  },
  computed: {
    ...mapGetters(["currentProcess"]),
  },
  methods: {
    ...mapActions(["getProcess"]),
  },
};
</script>

<style scoped>
.stages-block {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.voice-card {
  display: flex;
  align-items: center;
}
.participant {
  display: flex;
  align-items: center;
}
.line {
  border-left: 1px rgba(128, 128, 128, 0.4) solid;
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>