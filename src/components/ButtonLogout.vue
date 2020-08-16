<template>
  <div class="c-button-logout">
    <a
      v-if="authenticated"
      @click.prevent="handleClick"
      href="#logout"
      class="button"
      >Logout</a
    >
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ButtonLogout",
  computed: {
    ...mapState(["authenticated"])
  },
  methods: {
    ...mapActions(["logout"]),
    handleClick() {
      this.logout();
      if (this.$router.currentRoute.fullPath !== "/") {
        this.$router.push("/");
      }
    }
  }
};
</script>
