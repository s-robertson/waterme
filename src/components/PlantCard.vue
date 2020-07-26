<template>
  <div class="plant-card">
    <div class="plant-card__options">
      <label class="plant-card__label">
        <input :checked="isChecked" type="checkbox" @click="handleChange" />
        {{ plant.name }}
      </label>
      <router-link :to="`edit-plant/${plant.id}`">
        <SettingsIcon
          class="plant-card__settings"
          :alt="`Edit ${plant.name}`"
        />
      </router-link>
    </div>
    <div class="plant-card__watering-progress">
      <div class="plant-card__watering-progress-text">
        {{ `${daysRemaining} Days Remaining` }}
      </div>
      <div class="plant-card__watering-progress-fill" :style="progressStyle" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import SettingsIcon from "@/assets/settings.svg";

export default {
  name: "PlantCard",
  props: {
    plant: Object,
    isChecked: Boolean
  },
  computed: {
    daysRemaining() {
      const daysBetweenWatering = this.plant.days;
      const lastWatered = moment
        .unix(this.plant.lastWatered)
        .set({ second: 0, minute: 0, hour: 0 });
      const now = moment().set({ second: 0, minute: 0, hour: 0 });
      const daysSinceLastWatered = now.diff(lastWatered, "days");
      const daysRemaining = daysBetweenWatering - daysSinceLastWatered;

      if (daysRemaining > daysBetweenWatering) {
        return daysBetweenWatering;
      }

      return daysRemaining > 0 ? daysRemaining : 0;
    },
    wateringProgress() {
      return (this.daysRemaining / this.plant.days) * 100;
    },
    progressStyle() {
      return {
        width: `${this.wateringProgress}%`
      };
    }
  },
  methods: {
    handleChange(e) {
      this.$emit("toggle", e.target.checked);
    }
  },
  components: {
    SettingsIcon
  }
};
</script>

<style lang="scss">
@import "../assets/variables";

.plant-card__options {
  margin-bottom: 1rem;
}

.plant-card__settings {
  width: 25px;
  cursor: pointer;
  color: #00dcff;
  fill: $link-primary;
  float: right;
  vertical-align: middle;
}

.plant-card__watering-progress {
  border: 2px solid #fff;
  position: relative;
  height: 2rem;
  border-radius: 10px;
}

.plant-card__watering-progress-fill {
  background: $brand-secondary;
  height: 2rem;
  border-radius: 10px;
}

.plant-card__watering-progress-text {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 1rem;
  padding: 0.5rem 0;
  box-sizing: content-box;
}
</style>
