<template>
  <div class="app-header">
    <div class="app-header__container">
      <router-link to="/" class="app-header__logo-container">
        <PlantIcon class="app-header__logo" alt="" role="presentation" />
        <span class="app-header__logo-text">Water Me</span>
      </router-link>
      <div class="app-header__menu">
        <ButtonLogout />
      </div>
    </div>
  </div>
</template>

<script>
import PlantIcon from "@/assets/plant.svg";
import ButtonLogout from "@/components/ButtonLogout";

export default {
  name: "AppHeader",
  components: {
    ButtonLogout,
    PlantIcon
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.app-header {
  background: $brand-secondary;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.app-header__container {
  max-width: $app-max-width;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header__logo-container {
  text-decoration: none;
}

.app-header__logo {
  width: 50px;
  height: 50px;
  fill: #00dcff;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.app-header__logo-text {
  display: inline-block;
  padding-top: 0.5rem;
  vertical-align: middle;
}
</style>
