import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import PlantForm from "@/components/PlantForm";
import { createStore } from "../../helpers";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PlantForm component", () => {
  const defaultStoreOptions = {
    actions: {
      addPlant: jest.fn(),
      updatePlant: jest.fn()
    }
  };

  const stubs = ["router-link"];

  it("Should render correctly", () => {
    const wrapper = shallowMount(PlantForm, {
      localVue,
      store: createStore(defaultStoreOptions),
      stubs
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should validate plant information and display errors", async () => {
    const wrapper = shallowMount(PlantForm, {
      localVue,
      store: createStore(defaultStoreOptions),
      stubs
    });

    wrapper.find("input[type=text]").setValue("");
    wrapper.find("input[type=number]").setValue("-5");
    wrapper.find("form").trigger("submit");

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should update an existing plant", async () => {
    const expectedPlantName = "New Plant Name";
    const $router = {
      push: jest.fn()
    };
    const plant = {
      name: "Old Plant Name",
      days: 10,
      id: "123"
    };

    const wrapper = shallowMount(PlantForm, {
      localVue,
      store: createStore(defaultStoreOptions),
      stubs,
      propsData: {
        plant
      },
      mocks: {
        $router
      }
    });

    wrapper.find("input[type=text]").setValue(expectedPlantName);
    wrapper.find("input[type=number]").setValue("5");
    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();

    expect($router.push).toHaveBeenCalledWith("/");
    expect(defaultStoreOptions.actions.updatePlant).toHaveBeenCalledWith(
      expect.anything(),
      {
        id: "123",
        data: {
          days: 5,
          name: expectedPlantName
        }
      }
    );
  });

  it("Should add a new plant", async () => {
    const expectedPlantName = "Snake Plant";
    const $router = {
      push: jest.fn()
    };

    const wrapper = shallowMount(PlantForm, {
      localVue,
      store: createStore(defaultStoreOptions),
      stubs,
      mocks: {
        $router
      }
    });

    wrapper.find("input[type=text]").setValue(expectedPlantName);
    wrapper.find("input[type=number]").setValue("5");
    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();

    expect($router.push).toHaveBeenCalledWith("/");
    expect(defaultStoreOptions.actions.addPlant).toHaveBeenCalledWith(
      expect.anything(),
      {
        days: 5,
        name: expectedPlantName
      }
    );
  });
});
