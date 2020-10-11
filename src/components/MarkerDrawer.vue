<template>
  <div :class="{ hideme: !devMode }">
    <canvas class="canvas" ref="canvas"></canvas>
    <v-btn v-if="devMode" x-small @click="logParts">DEV:logParts</v-btn>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  name: "marker-drawer",
  props: {},
  data: () => ({
    width: 40,
    height: 80,

    canvas: null,
    parts: {
      direction: null,
      indicator: null,
      indicatorSel: null,
      idx: null,
      alt: null
    }
  }),
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.canvas, {
      isDrawingMode: false,
      selection: false,
      allowTouchScrolling: false,
      enableRetinaScaling: true
    });
    this.canvas.setWidth(this.width);
    this.canvas.setHeight(this.height);
    this.canvas.calcOffset();

    fabric.Image.fromURL("/img/direction.png", img => {
      img.set("left", this.width / 2);
      img.set("top", this.height / 2);
      img.set("originX", "center");
      img.set("originY", "center");
      img.scale(0.6);
      img.key = "direction";
      this.canvas.add(img);
      this.parts.direction = img;
      img.sendToBack();
      this.bringTextsToFront();
    });

    fabric.Image.fromURL("/img/indicator.png", img => {
      img.set("top", this.height);
      img.set("originY", "bottom");
      this.canvas.add(img);
      this.parts.indicator = img;
      this.bringTextsToFront();
    });
    fabric.Image.fromURL("/img/indicator-selected.png", img => {
      img.set("top", this.height);
      img.set("originY", "bottom");
      this.canvas.add(img);
      this.parts.indicatorSel = img;
      this.bringTextsToFront();
    });

    this.parts.idx = this.makeIdxText(1);
    this.canvas.add(this.parts.idx);

    this.parts.alt = this.makeAltitudeText(0);
    this.canvas.add(this.parts.alt);

    this.canvas.requestRenderAll();
  },
  methods: {
    getMarker(markerData) {
      console.log("markerData", markerData);

      this.parts.indicatorSel.opacity = markerData.selected ? 1 : 0;

      // TODO: optimize; should be a way of changing text without removing and adding element
      this.canvas.remove(this.parts.idx);
      this.parts.idx = this.makeIdxText(markerData.idx);
      this.canvas.add(this.parts.idx);

      // TODO: optimize; should be a way of changing text without removing and adding element
      this.canvas.remove(this.parts.alt);
      this.parts.alt = this.makeAltitudeText(markerData.altitude);
      this.canvas.add(this.parts.alt);

      this.parts.direction.angle = markerData.heading;

      return this.canvas.toDataURL();
    },
    bringTextsToFront() {
      setTimeout(() => {
        if (this.parts.idx) this.parts.idx.bringToFront();
        if (this.parts.alt) this.parts.alt.bringToFront();
      }, 126);
    },
    makeAltitudeText(altitude) {
      let rez = new fabric.Text(altitude + "m", {
        fontFamily: "Roboto",
        fontSize: 12,
        left: this.width / 2,
        top: this.height / 4,
        originX: "center",
        originY: "center"
      });
      rez.set("backgroundColor", "black");
      rez.set("fill", "white");
      return rez;
    },
    makeIdxText(idx) {
      let rez = new fabric.Text((idx || 1) + "", {
        fontFamily: "Roboto",
        fontSize: 12,
        left: this.width / 2,
        top: (this.height * 3) / 4,
        originX: "center",
        originY: "center"
      });
      rez.set("fill", "white");
      return rez;
    },
    // DEV:
    logParts() {
      console.log(this.parts);
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.canvas {
  border: 1px solid red;
  width: 30px;
  height: 50px;
}
.hideme {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
