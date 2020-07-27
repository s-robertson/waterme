export default {
  appLoaded(state) {
    state.loading = false;
  },
  addPlant(state, plant) {
    state.plants.push(plant);
  },
  setPlants(state, plants) {
    state.plants = plants;
  },
  deletePlant(state, id) {
    state.plants = state.plants.filter(plant => plant.id !== id);
  },
  updatePlant(state, { id, data }) {
    state.plants = state.plants.map(plant => {
      if (plant.id !== id) {
        return plant;
      }

      return {
        id,
        ...plant,
        ...data
      };
    });
  }
};
