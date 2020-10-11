<template>
  <section>
    <GmapMap ref="mapRef" class="gmap" :center="{ lat: 54.710661, lng: 25.286857 }" :options="mapOptions" @click="addMarker">
      <GmapMarker
        v-for="(marker, i) in markers"
        :key="'marker' + i"
        :position="marker"
        :icon="marker.icon"
        :draggable="true"
        @click="selectMarker(marker)"
        @dragend="markerLocationChange($event, marker)"
      />
      <GmapPolyline v-if="polyline.length > 1" :path="polyline" />
    </GmapMap>

    <v-container fluid>
      <v-row>
        <v-col cols="12"><MarkerDrawer ref="drawer"/></v-col>
        <v-col cols="12" class="text-h6">Marker points</v-col>
        <v-col cols="12" class="text-caption">{{ markers }}</v-col>
      </v-row>
    </v-container>

    <MarkerControls
      v-if="selectedMarker && selectedMarker.selected"
      :marker="selectedMarker"
      :lastMarker="lastMarker"
      @close="deselectMarker"
      @update="updateSelectedMarker"
      @selectOther="selectOther"
    />
  </section>
</template>

<script>
import { makeMarker } from "@/utils/commonFunctions.js";
export default {
  name: "map-view",
  props: {},
  components: {
    MarkerDrawer: () => import(/* webpackChunkName: "com" */ "@/components/MarkerDrawer.vue"),
    MarkerControls: () => import(/* webpackChunkName: "com" */ "@/components/MarkerControls.vue")
  },
  data: () => ({
    map: null,
    mapOptions: {
      zoom: 14,
      mapTypeId: "roadmap"
      // disableDefaultUI: true
    },
    selectedMarker: null,
    markers: [],
    polyline: []
  }),
  mounted() {
    this.updatePolyline();
  },
  methods: {
    addMarker(evt) {
      this.deselectMarker();
      let lastMarker = this.markers.length > 0 ? this.markers[this.markers.length - 1] : {};
      let newMarker = makeMarker(evt.latLng.lat(), evt.latLng.lng(), this.markers.length + 1, lastMarker);
      newMarker.icon = this.$refs.drawer.getMarker(newMarker);
      this.markers.push(newMarker);
      this.updatePolyline();
    },
    selectMarker(marker) {
      this.deselectMarker();
      marker.selected = true;
      marker.icon = this.$refs.drawer.getMarker(marker);
      this.selectedMarker = marker;
    },
    updateSelectedMarker() {
      this.selectedMarker.icon = this.$refs.drawer.getMarker(this.selectedMarker);
    },
    selectOther(next) {
      this.deselectMarker();
      this.selectMarker(this.markers.find(marker => marker.idx === this.selectedMarker.idx + (next ? 1 : -1)));
    },
    deselectMarker() {
      if (this.selectedMarker) {
        this.selectedMarker.selected = false;
        this.selectedMarker.icon = this.$refs.drawer.getMarker(this.selectedMarker);
      }
    },
    markerLocationChange(event, target) {
      console.log(target.id, event);
      // this.markers.find(marker => marker.id === target.id)
      target.lat = event.latLng.lat();
      target.lng = event.latLng.lng();
      this.updatePolyline();
    },
    updatePolyline() {
      this.polyline.length = 0;
      this.markers.forEach(marker => this.polyline.push({ lat: marker.lat, lng: marker.lng }));
    }
  },
  computed: {
    lastMarker() {
      return this.markers.length > 0 ? this.markers[this.markers.length - 1].selected : true;
    }
  }
};
</script>

<style scoped lang="scss">
.gmap {
  width: 100%;
  height: 80vh;
  z-index: 1;
}
.dev {
  border: 1px solid red;
}
</style>
