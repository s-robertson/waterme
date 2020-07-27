import { v4 as uuid } from "uuid";

export default {
  addPlant({ commit }, plant) {
    commit("addPlant", {
      ...{
        name: plant.name,
        days: plant.days
      },
      ...{
        id: uuid(),
        lastWatered: 0
      }
    });
  },
  deletePlant({ commit }, id) {
    commit("deletePlant", id);
  },
  updatePlant({ commit }, plantToUpdate) {
    commit("updatePlant", plantToUpdate);
  },
  waterPlants({ commit }, plantIds) {
    plantIds.forEach(id => commit("waterPlant", id));
  }
};
