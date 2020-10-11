<template>
  <section v-if="devMode">
    <v-snackbar v-model="showToolbar" top :timeout="-1" multi-line>
      <v-btn @click="clearSessionStorage" x-small>sessionClear</v-btn>
      <v-btn @click="logState" x-small>log state</v-btn>
      <v-btn dark icon @click="switchTheme">
        <v-icon v-if="darkTheme">mdi-brightness-6</v-icon>
        <v-icon v-else>mdi-brightness-2</v-icon>
      </v-btn>
    </v-snackbar>

    <v-snackbar v-model="showToolbar" bottom :timeout="-1" multi-line>
      <div class="colorbuttons">
        <div v-for="(colors, i) in colorBtns" :key="`l${i}Colors`">
          <v-btn v-for="color in colors" :key="color" small :color="color">{{ color }}</v-btn>
        </div>
      </div>
    </v-snackbar>
  </section>
</template>

<script>
export default {
  name: "dev-toolbar",
  props: {},
  components: {},
  data: () => ({
    showToolbar: false,
    colorBtns: [
      ["primary", "secondary", "accent"],
      ["error", "info", "success", "warning"]
    ],
    forcinPassChange: false
  }),
  mounted() {
    if (this.devMode) window.addEventListener("keydown", this.handleKeypress);
    if (localStorage.getItem("dev_dark")) this.$vuetify.theme.dark = true;
  },
  methods: {
    handleKeypress(evt) {
      if (evt.code === "Backquote") this.showToolbar = !this.showToolbar;
    },
    logState() {
      console.log(this.$store.state);
    },
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$vuetify.theme.dark) localStorage.setItem("dev_dark", "true");
      else localStorage.removeItem("dev_dark");
    },
    clearSessionStorage() {
      sessionStorage.clear();
    }
  },
  computed: {
    darkTheme() {
      return this.$vuetify.theme.dark;
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeypress);
  }
};
</script>

<style scoped lang="scss">
.colorbuttons button {
  margin: 4px !important;
}
.colorbuttons div {
  text-align: center;
}
</style>
