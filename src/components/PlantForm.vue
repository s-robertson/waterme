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
      <label for="name">
        Name:
        <input id="name" v-model="plantName" type="text" />
      </label>
    </div>
    <div>
      <label for="days">
        Days between watering:
        <input id="days" v-model="days" type="number" />
      </label>
    </div>
    <button type="submit">{{ submitLabel }}</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PlantForm",
  data() {
    return {
      plantName: "",
      days: 0,
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
    },
    submitLabel() {
      if (this.plant) {
        return "Save Changes";
      }

      return "Add Plant";
    }
  },
  mounted() {
    if (this.plant) {
      this.plantName = this.plant.name;
      this.days = this.plant.days;
    }
  },
  methods: {
    ...mapActions(["addPlant", "updatePlant"]),
    handleSubmit() {
      if (this.validate()) {
        if (this.plant) {
          this.updatePlant({
            id: this.plant.id,
            data: {
              name: this.plantName,
              days: this.days
            }
          });
        } else {
          this.addPlant({
            name: this.plantName,
            days: this.days
          });
        }

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
