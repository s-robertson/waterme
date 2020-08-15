export default {
  setCurrentUserId(state, uid) {
    state.currentUserId = uid;
  },
  authenticated(state, authenticated = true) {
    state.authenticated = authenticated;
  },
  setLoginErrors(state, errors) {
    state.loginErrors = errors;
  },
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
  },
  registered(state) {
    state.registered = true;
  },
  setRegistrationErrors(state, errors) {
    state.registrationErrors = errors;
  }
};
