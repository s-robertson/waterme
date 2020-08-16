<template>
  <div class="login-form">
    <ErrorList :errors="loginErrors" />
    <form action="" @submit.prevent="handleSubmit">
      <div class="c-form-item">
        <label
          >Email:
          <input v-model="email" type="text" data-test="input-login-email"
        /></label>
      </div>
      <div class="c-form-item">
        <label
          >Password:
          <input v-model="password" type="text" data-test="input-login-password"
        /></label>
      </div>
      <OptionButtons>
        <button type="submit" data-test="input-login-submit">Login</button>
        <router-link to="/register" class="button"
          >Register for a New Account</router-link
        >
      </OptionButtons>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ErrorList from "@/components/ErrorList";
import OptionButtons from "@/components/OptionButtons";

export default {
  name: "LoginForm",
  components: { OptionButtons, ErrorList },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState(["loginErrors"])
  },
  methods: {
    ...mapActions(["login"]),
    async handleSubmit() {
      const loginResult = await this.login({
        email: this.email,
        password: this.password
      });

      if (loginResult) {
        this.$router.push("/");
      }
    }
  }
};
</script>
