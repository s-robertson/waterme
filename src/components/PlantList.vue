<template>
  <div class="plant-list">
    <p v-if="!hasPlants">
      You haven't added any plants yet!
    </p>
    <div>
      <form action="" @submit.prevent="handleSubmit">
        <template v-if="hasPlants">
          <p>Select plants to water:</p>
          <PlantCard
            v-for="plant in sortedPlants"
            :key="plant.id"
            :is-checked="isChecked(plant.id)"
            @toggle="toggled => handlePlantToggle(toggled, plant.id)"
            :plant="plant"
            class="plant-list__plant"
          />
        </template>
        <OptionButtons>
          <button
            v-if="hasPlants"
            class="plant-list__water-button"
            type="submit"
          >
            Water Selected Plants
          </button>
          <router-link class="plant-list__add-plant button" to="/add-plant"
            >Add a new plant</router-link
          >
        </OptionButtons>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PlantCard from "@/components/PlantCard";
import OptionButtons from "@/components/OptionButtons";

export default {
  name: "PlantList",
  components: { OptionButtons, PlantCard },
  data() {
    return {
      plantsToWater: []
    };
  },
  computed: {
    ...mapGetters(["sortedPlants"]),
    hasPlants() {
      return this.plantsFetched && this.sortedPlants.length > 0;
    },
    plantsFetched() {
      return this.sortedPlants !== null;
    }
  },
  methods: {
    ...mapActions(["waterPlants", "fetchPlants"]),
    isChecked(plantId) {
      return this.plantsToWater.findIndex(item => item === plantId) !== -1;
    },
    handleSubmit() {
      if (this.plantsToWater.length) {
        this.waterPlants(this.plantsToWater);
        this.plantsToWater = [];
      }
    },
    handlePlantToggle(toggled, id) {
      if (toggled) {
        this.plantsToWater = [...this.plantsToWater, id];
        return;
      }
      this.plantsToWater = this.plantsToWater.filter(plantId => plantId !== id);
    }
  }
};
</script>

<style>
.plant-list__plant {
  margin-bottom: 3rem;
}
</style>
