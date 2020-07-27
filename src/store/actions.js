import repo from "@/store/storage/repository";

export default {
  async init({ commit }) {
    await repo.init();
    const plants = await repo.fetchPlants();
    commit("setPlants", plants);
    commit("appLoaded");
  },
  async addPlant({ commit }, { name, days }) {
    const plantData = {
      name,
      days,
      lastWatered: 0
    };

    const newPlantId = repo.addPlant(plantData);

    commit("addPlant", {
      ...{ id: newPlantId },
      ...plantData
    });
  },
  async deletePlant({ commit }, id) {
    repo.deletePlant(id);
    commit("deletePlant", id);
  },
  async updatePlant({ commit }, { id, data }) {
    repo.updatePlant(id, data);
    commit("updatePlant", { id, data });
  },
  async waterPlants({ commit }, plantIds) {
    plantIds.forEach(id => {
      const data = {
        lastWatered: Math.round(Date.now() / 1000)
      };

      repo.updatePlant(id, data);
      commit("updatePlant", { id, data });
    });
  }
};
