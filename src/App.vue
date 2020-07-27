<template>
  <div id="app">
    <div v-if="loading" class="app_loader">
      Loading...
    </div>
    <div v-else class="app__container">
      <AppHeader />
      <div class="app__content">
        <router-view />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
export default {
  computed: {
    ...mapState(["loading"])
  },
  methods: {
    ...mapActions(["init"])
  },
  mounted() {
    this.init();
  },
  components: { AppFooter, AppHeader }
};
</script>

<style lang="scss">
@import "./assets/variables";
@import "./assets/app.scss";

#app {
  min-height: 100%;
  position: relative;
}

.app__content {
  margin: 2rem auto 0 auto;
  padding-bottom: 4rem;
  max-width: $app-max-width;
}
</style>
