<template>
  <v-card class="location elevation-2">
    <v-card-title>
      <div>Marker options</div>
      <v-spacer />
      <v-icon @click="$emit('close')">mdi-close</v-icon>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field v-model="marker.lat" label="Latitude"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="marker.lng" label="Longitude"></v-text-field>
        </v-col>
      </v-row>
      <MCR>
        <template v-slot:label>Altitude</template>
        <template v-slot:value><v-text-field v-model="marker.altitude" suffix="m" @input="$emit('update')"></v-text-field></template>
        <template v-slot:control><v-slider v-model="marker.altitude" class="mt-4" max="500" min="-200" @input="$emit('update')"></v-slider></template>
      </MCR>
      <MCR>
        <template v-slot:label>Heading</template>
        <template v-slot:value><v-text-field v-model="marker.heading" suffix="°" @input="$emit('update')"></v-text-field></template>
        <template v-slot:control><v-slider v-model="marker.heading" class="mt-4" max="359" min="0" @input="$emit('update')"></v-slider></template>
      </MCR>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('delete')">delete</v-btn>
      <v-spacer />
      <v-btn icon :disabled="marker.idx === 1" @click="$emit('selectOther', false)"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-btn icon :disabled="lastMarker" @click="$emit('selectOther', true)"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "marker-controls",
  props: {
    marker: { type: Object, required: true },
    lastMarker: Boolean
  },
  components: {
    MCR: () => import(/* webpackChunkName: "com" */ "@/components/MarkerControlsRow.vue")
  },
  data: () => ({}),
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style scoped lang="scss">
.location {
  position: fixed;
  right: 0;
  top: 10vh;
  width: 500px;
  z-index: 2;
  // background-color: white;
}
.col {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
