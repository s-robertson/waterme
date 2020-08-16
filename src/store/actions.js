import storage from "@/services/appStorage";
import appAuth from "@/services/auth";

export default {
  async login({ commit }, { email, password }) {
    try {
      await appAuth.login(email, password);
      commit("authenticated");
      return true;
    } catch (err) {
      commit("setLoginErrors", err.messages);
      return false;
    }
  },
  async logout({ commit }) {
    appAuth.logout();
    commit("authenticated", false);
  },
  async register({ commit }, { email, password }) {
    try {
      await appAuth.register(email, password);
      commit("registered");
    } catch (err) {
      commit("setRegistrationErrors", err.messages);
    }
  },
  async fetchPlants({ commit }) {
    const plants = await storage.fetchPlants();
    commit("setPlants", plants);
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
