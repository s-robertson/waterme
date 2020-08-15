<template>
  <div class="registration-form">
    <ErrorList :errors="registrationErrors" />
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">
          Email address:
          <input v-model="email" id="email" type="text" />
        </label>
      </div>
      <div>
        <label for="password">
          Password:
          <input v-model="password" id="password" type="password" />
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ErrorList from "@/components/ErrorList";

export default {
  name: "RegistrationForm",
  components: { ErrorList },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  computed: {
    ...mapState(["registrationErrors"])
  },
  methods: {
    ...mapActions(["register"]),
    async handleSubmit() {
      try {
        await this.register({ email: this.email, password: this.password });
        this.$router.push("/");
      } catch (err) {
        this.errorMessage = err;
      }
    }
  }
};
</script>

<style scoped></style>
