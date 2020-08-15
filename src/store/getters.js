export default {
  sortedPlants(state) {
    if (state.plants === null) {
      return null;
    }
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
