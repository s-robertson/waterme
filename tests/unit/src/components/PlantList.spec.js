import { shallowMount, createLocalVue } from "@vue/test-utils";
import PlantList from "@/components/PlantList";
import Vuex from "vuex";
import PlantCard from "@/components/PlantCard";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PlantForm component", () => {
  let mockPlants;

  beforeEach(() => {
    mockPlants = [
      {
        name: "Plant One",
        days: 10
      },
      {
        name: "Plant Two",
        days: 10
      },
      {
        name: "Plant Three",
        days: 10
      }
    ];
  });

  it("Should render correctly when plants have not been added", () => {
    const store = new Vuex.Store({
      state: {},
      getters: {
        sortedPlants() {
          return [];
        }
      }
    });

    const wrapper = shallowMount(PlantList, {
      store,
      localVue,
      stubs: ["router-link"]
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should render correctly when plants have been added", () => {
    const store = new Vuex.Store({
      state: {},
      getters: {
        sortedPlants() {
          return mockPlants;
        }
      }
    });
    const wrapper = shallowMount(PlantList, {
      store,
      localVue,
      stubs: ["router-link"]
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should keep track of which plants to water", () => {
    const store = new Vuex.Store({
      state: {},
      getters: {
        sortedPlants() {
          return mockPlants;
        }
      }
    });
    const wrapper = shallowMount(PlantList, {
      store,
      localVue,
      stubs: ["router-link"]
    });

    const cardComponents = wrapper.findAllComponents(PlantCard);
    cardComponents.at(0).vm.$emit("toggle", true);
    cardComponents.at(1).vm.$emit("toggle", true);
    cardComponents.at(1).vm.$emit("toggle", false);
    cardComponents.at(2).vm.$emit("toggle", true);
    expect(wrapper.vm.plantsToWater).toEqual([0, 2]);
  });

  it("Should mark selected plants as watered", () => {
    const mockActions = {
      waterPlants: jest.fn()
    };

    const store = new Vuex.Store({
      state: {},
      actions: mockActions,
      getters: {
        sortedPlants() {
          return mockPlants;
        }
      }
    });
    const wrapper = shallowMount(PlantList, {
      store,
      localVue,
      stubs: ["router-link"]
    });

    const cardComponents = wrapper.findAllComponents(PlantCard);
    cardComponents.at(0).vm.$emit("toggle", true);
    cardComponents.at(2).vm.$emit("toggle", true);
    wrapper.find("form").trigger("submit");
    expect(mockActions.waterPlants).toHaveBeenCalledWith(expect.any(Object), [
      0,
      2
    ]);
  });
});
