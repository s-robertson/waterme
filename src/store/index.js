import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuid } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    plants: [
      {
        id: "7ef2341f-43fd-49d8-9eed-235d97fe2eb2",
        name: "Snake Plant",
        days: 5,
        lastWatered: 0
      },
      {
        id: "91ff8f83-9875-40d5-8d70-1d7466ae0768",
        name: "Spider Plant",
        days: 10,
        lastWatered: 1595283597
      }
    ]
  },
  mutations: {
    addPlant(state, plant) {
      state.plants.push(plant);
    },
    updatePlant(state, plantToUpdate) {
      state.plants = state.plants.map(plant => {
        if (plant.id !== plantToUpdate.id) {
          return plant;
        }

        return {
          ...plant,
          ...{
            name: plantToUpdate.name,
            days: plantToUpdate.days
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
  },
  actions: {
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
    updatePlant({ commit }, plantToUpdate) {
      commit("updatePlant", plantToUpdate);
    },
    waterPlants({ commit }, plantIds) {
      plantIds.forEach(id => commit("waterPlant", id));
    }
  },
  modules: {},
  getters: {
    sortedPlants(state) {
      return state.plants.sort((a, b) =>
        a.lastWatered < b.lastWatered ? 1 : -1
      );
    },
    plantById(state) {
      return id => {
        return state.plants.find(plant => id === plant.id);
      };
    }
  }
});
