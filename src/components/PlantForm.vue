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
    <div class="c-form-item">
      <label>
        Name:
        <input v-model="plantName" type="text" autocomplete="off" />
      </label>
    </div>
    <div class="c-form-item">
      <label>
        Days between watering:
        <input v-model="days" type="number" autocomplete="off" />
      </label>
    </div>
    <OptionButtons>
      <button type="submit">{{ submitLabel }}</button>
      <router-link to="/">
        Cancel
      </router-link>
    </OptionButtons>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import OptionButtons from "@/components/OptionButtons";

export default {
  name: "PlantForm",
  components: { OptionButtons },
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
