<template>
  <div class="plant-list">
    <p v-if="!hasPlants">
      You haven't added any plants yet!
    </p>
    <div v-if="hasPlants">
      <p>Select plants to water:</p>
      <form action="" @submit.prevent="handleSubmit">
        <PlantCard
          v-for="(plant, plantIndex) in sortedPlants"
          :key="plantIndex"
          :is-checked="isChecked(plantIndex)"
          @toggle="toggled => handlePlantToggle(toggled, plantIndex)"
          :plant="plant"
          class="plant-list__plant"
        />
        <button type="submit">Water Selected Plants</button>
        <router-link class="button" to="/add-plant"
          >Add a new plant</router-link
        >
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PlantCard from "@/components/PlantCard";

export default {
  name: "PlantList",
  components: { PlantCard },
  data() {
    return {
      plantsToWater: []
    };
  },
  computed: {
    ...mapGetters(["sortedPlants"]),
    hasPlants() {
      return this.sortedPlants.length > 0;
    }
  },
  methods: {
    ...mapActions(["waterPlants"]),
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
