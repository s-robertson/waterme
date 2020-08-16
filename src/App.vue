<template>
  <div id="app">
    <div v-if="loading" class="app__loader">
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
import { mapState } from "vuex";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
export default {
  computed: {
    ...mapState(["loading"])
  },
  components: { AppFooter, AppHeader }
};
</script>

<style lang="scss">
@import "assets/scss/variables";
@import "assets/scss/app";

#app {
  min-height: 100%;
  position: relative;
}

.app__loader {
  padding: 4rem 0 0 0;
  text-align: center;
}

.app__content {
  margin: 2rem auto 0 auto;
  padding: 0 1.5rem 4rem;
  max-width: $app-max-width;
}
</style>
