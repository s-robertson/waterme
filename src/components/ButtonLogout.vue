<template>
  <div class="c-button-logout">
    <button v-if="authenticated" @click="handleClick" class="button">
      Logout
    </button>
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
