<template>
  <div class="stepper">
    <span
      v-for="(item, i) in stages"
      :key="i"
      v-bind:class="{ fullWidth: i !== stages.length - 1 }"
      class="avatar"
    >
      <v-avatar
        v-if="item.status !== 'inWork'"
        :color="color[item.status]"
        size="26"
      >
        <span class="white--text">{{ i + 1 }}</span>
      </v-avatar>
      <v-avatar v-else color="amber" size="26">
        <v-icon>mdi-timelapse</v-icon>
      </v-avatar>
      <v-divider style="width: 20px" v-if="i !== stages.length - 1" />
    </span>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    stages: Array,
  },
  data() {
    return {
      color: {
        success: "success",
        waiting: "grey lighten-2",
        notSuccess: "error",
      },
    };
  },
};
</script>

<style scoped>
.stepper {
  display: flex;
  justify-content: space-between;
}
.avatar {
  display: flex;
  align-items: center;
}
.fullWidth {
  width: 100%;
}
</style>