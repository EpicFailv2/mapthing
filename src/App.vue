<template>
  <v-app>
    <DevToolbar v-if="devMode" />
    <!-- <v-app-bar app color="primary" dark>
      <div>Map test type thing</div>
    </v-app-bar> -->

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    DevToolbar: () => import(/* webpackChunkName: "com-dev" */ "@/components/dev/DevToolbar.vue")
  },
  data: () => ({})
};
</script>
