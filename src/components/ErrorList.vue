<template>
  <div class="c-error-list" aria-live="assertive">
    <ul v-if="errors.length">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ErrorList",
  props: {
    errors: {
      type: Array,
      default: () => []
    }
  }
};
</script>
