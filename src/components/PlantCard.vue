<template>
  <div class="c-plant-card" data-test="plant-card">
    <div class="c-plant-card__options">
      <input
        :id="checkboxId"
        :checked="isChecked"
        type="checkbox"
        @click="handleChange"
        data-test="checkbox-water-plant"
      />
      <label class="c-plant-card__label" :for="checkboxId">
        {{ plant.name }}
      </label>
      <div class="c-plant-card__buttons">
        <router-link :to="`edit-plant/${plant.id}`" class="button--icon">
          <SettingsIcon
            class="c-plant-card__settings"
            :alt="`Edit ${plant.name}`"
          />
        </router-link>
        <button
          class="button--icon plant-card__delete"
          @click.prevent="handleDeleteClick"
          data-test="button-delete-plant"
        >
          <TrashIcon />
          <span class="sr-only">{{ `Delete ${plant.name}` }}</span>
        </button>
      </div>
    </div>
    <div class="c-plant-card__watering-progress">
      <div class="c-plant-card__watering-progress-text">
        {{ `${daysRemaining} Days Remaining` }}
      </div>
      <div
        class="c-plant-card__watering-progress-fill"
        :style="progressStyle"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";
import SettingsIcon from "@/assets/settings.svg";
import TrashIcon from "@/assets/trash.svg";

export default {
  name: "PlantCard",
  props: {
    plant: Object,
    isChecked: Boolean
  },
  computed: {
    checkboxId() {
      return `water-plant-${this.plant.id}`;
    },
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
    ...mapActions(["deletePlant"]),
    handleDeleteClick() {
      this.deletePlant(this.plant.id);
    },
    handleChange(e) {
      this.$emit("toggle", e.target.checked);
    }
  },
  components: {
    SettingsIcon,
    TrashIcon
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.c-plant-card__options {
  margin-bottom: 1rem;
}

.c-plant-card__buttons {
  float: right;
  display: flex;
}

.c-plant-card__settings {
  width: 25px;
  cursor: pointer;
  fill: $link;
  margin-right: 0.5rem;
}

.c-plant-card__watering-progress {
  border: 2px solid #fff;
  position: relative;
  height: 2rem;
  border-radius: 10px;
}

.c-plant-card__watering-progress-fill {
  background: $brand-secondary;
  height: 2rem;
  border-radius: 10px;
}

.plant-card__delete {
  width: 25px;
  vertical-align: middle;
  display: inline-block;
}

.c-plant-card__watering-progress-text {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 1rem;
  padding: 0.5rem 0;
  box-sizing: content-box;
}
</style>
