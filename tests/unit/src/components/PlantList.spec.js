import { shallowMount, createLocalVue } from "@vue/test-utils";
import PlantList from "@/components/PlantList";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PlantForm component", () => {
  it("Should render correctly", () => {
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
      localVue
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
