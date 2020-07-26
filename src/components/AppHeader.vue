<template>
  <div class="app-header">
    <div class="app-header__logo-wrapper">
      <PlantIcon class="app-header__logo" alt="" role="presentation" />
      <div>
        Water Me
      </div>
    </div>
  </div>
</template>

<script>
import PlantIcon from "@/assets/plant.svg";

export default {
  name: "AppHeader",
  components: {
    PlantIcon
  }
};
</script>

<style lang="scss">
@import "../assets/variables";

.app-header {
  background: $brand-secondary;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.app-header__logo-wrapper {
  max-width: $app-max-width;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.app-header__logo {
  width: 50px;
  height: 50px;
  fill: #00dcff;
  margin-right: 0.5rem;
}
</style>
