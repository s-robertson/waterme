import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    plants: [
      {
        name: "Snake Plant",
        days: 5,
        lastWatered: 0
      },
      {
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
    waterPlant(state, id) {
      state.plants = state.plants.map((plant, index) => {
        if (index === id) {
          plant.lastWatered = Date.now() / 1000;
        }

        return plant;
      });
    }
  },
  actions: {
    addPlant({ commit }, plant) {
      commit("addPlant", {
        ...plant,
        ...{
          lastWatered: 0
        }
      });
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
    }
  }
});
