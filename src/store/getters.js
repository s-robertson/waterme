export default {
  sortedPlants(state) {
    return state.plants.sort((a, b) =>
      a.lastWatered > b.lastWatered ? 1 : -1
    );
  },
  plantById(state) {
    return id => {
      return state.plants.find(plant => id === plant.id);
    };
  }
};
