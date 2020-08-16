<template>
  <div class="c-registration-form">
    <ErrorList :errors="registrationErrors" />
    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="c-form-item">
        <label for="email">
          Email address:
          <input v-model="email" id="email" type="text" />
        </label>
      </div>
      <div class="c-form-item">
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
      password: ""
    };
  },
  computed: {
    ...mapState(["registrationErrors"])
  },
  methods: {
    ...mapActions(["register"]),
    async handleSubmit() {
      const result = await this.register({
        email: this.email,
        password: this.password
      });
      if (result) {
        this.$router.push("/");
      }
    }
  }
};
</script>
