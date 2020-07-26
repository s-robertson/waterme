<template>
  <div id="app">
    <AppHeader />
    <div class="app__content">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

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

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
export default {
  components: { AppFooter, AppHeader }
};
</script>
