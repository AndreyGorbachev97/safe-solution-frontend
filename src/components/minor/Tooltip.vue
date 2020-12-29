<template>
  <v-tooltip
    :top="!position"
    :right="position === 'right'"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on, attrs }">
      <span
        v-bind="attrs"
        v-on="on"
      >
        <slot></slot>
      </span>
    </template>
    <span>{{ hint }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    hint: String,
    position: String,
    disabled: Boolean,
  },
};
</script>

<style scoped>

</style>
