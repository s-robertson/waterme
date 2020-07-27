export default {
  addPlant(state, plant) {
    state.plants.push(plant);
  },
  deletePlant(state, id) {
    state.plants = state.plants.filter(plant => plant.id !== id);
  },
  updatePlant(state, { id, name, days }) {
    state.plants = state.plants.map(plant => {
      if (plant.id !== id) {
        return plant;
      }

      return {
        ...plant,
        ...{
          name,
          days
        }
      };
    });
  },
  waterPlant(state, id) {
    state.plants = state.plants.map(plant => {
      if (plant.id === id) {
        plant.lastWatered = Date.now() / 1000;
      }

      return plant;
    });
  }
};
