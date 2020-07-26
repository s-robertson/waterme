<template>
  <form action="" @submit.prevent="handleSubmit">
    <div aria-live="assertive">
      <div v-if="hasErrors">
        <p>Please correct the following errors:</p>
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
    <div>
      <label>
        Name:
        <input v-model="plantName" type="text" />
      </label>
    </div>
    <div>
      <label>
        Days between watering:
        <input v-model="days" type="number" />
      </label>
    </div>
    <button type="submit">Add plant</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PlantForm",
  data() {
    return {
      plantName: "",
      days: 7,
      errors: []
    };
  },
  props: {
    plant: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    ...mapActions(["addPlant"]),
    handleSubmit() {
      if (this.validate()) {
        this.addPlant({
          name: this.plantName,
          days: this.days
        });

        this.$router.push("/");
      }
    },
    validate() {
      this.errors = [];

      if (this.plantName.length === 0) {
        this.errors.push("Please enter a name for the plant.");
      }
      if (this.days <= 0) {
        this.errors.push(
          "The number of days between watering must be greater than zero."
        );
      }

      return !this.hasErrors;
    }
  }
};
</script>
