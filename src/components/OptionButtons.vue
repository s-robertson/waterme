<template>
  <div class="c-option-buttons">
    <slot />
  </div>
</template>

<script>
export default {
  name: "OptionButtons"
};
</script>

<style lang="scss">
.c-option-buttons {
  display: flex;
  align-items: center;

  * + * {
    margin-left: 0.5rem;
  }
}
</style>
