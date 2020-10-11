<template>
  <v-row align="center">
    <v-col cols="2">
      <slot name="label"></slot>
    </v-col>
    <v-col cols="2">
      <slot name="value"></slot>
    </v-col>
    <v-col cols="8">
      <slot name="control"></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "marker-controls-row",
  props: {},
  data: () => ({}),
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style scoped lang="scss"></style>
