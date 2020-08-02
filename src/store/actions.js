import storage from "@/store/storage/appStorage";

export default {
  async init({ commit }) {
    await storage.init();
    const plants = await storage.fetchPlants();
    commit("setPlants", plants);
    commit("appLoaded");
  },
  async addPlant({ commit }, { name, days }) {
    const plantData = {
      name,
      days,
      lastWatered: 0
    };

    const newPlantId = storage.addPlant(plantData);

    commit("addPlant", {
      ...{ id: newPlantId },
      ...plantData
    });
  },
  async deletePlant({ commit }, id) {
    storage.deletePlant(id);
    commit("deletePlant", id);
  },
  async updatePlant({ commit }, { id, data }) {
    storage.updatePlant(id, data);
    commit("updatePlant", { id, data });
  },
  async waterPlants({ commit }, plantIds) {
    plantIds.forEach(id => {
      const data = {
        lastWatered: Math.round(Date.now() / 1000)
      };

      storage.updatePlant(id, data);
      commit("updatePlant", { id, data });
    });
  }
};
