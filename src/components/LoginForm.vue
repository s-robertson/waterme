<template>
  <div class="login-form">
    <ErrorList :errors="loginErrors" />
    <form action="" @submit.prevent="handleSubmit">
      <div>
        <label for="email"
          >Email: <input v-model="email" id="email" type="text"
        /></label>
      </div>
      <div>
        <label for="password"
          >Password: <input v-model="password" id="password" type="password"
        /></label>
      </div>
      <OptionButtons>
        <button type="submit">Login</button>
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

<style scoped></style>
