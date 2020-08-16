import MockDate from "mockdate";
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import PlantCard from "@/components/PlantCard";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PlantCard component", () => {
  beforeAll(() => {
    MockDate.set("2020-07-30");
  });

  afterAll(() => {
    MockDate.reset();
  });

  const mockPlant = {
    id: "123",
    name: "My Plant",
    lastWatered: Math.round(Date.UTC(2020, 6, 25) / 1000),
    days: 10
  };

  const stubs = ["router-link"];

  it("Should render correctly", () => {
    const wrapper = shallowMount(PlantCard, {
      propsData: {
        plant: mockPlant
      },
      stubs,
      localVue
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should delete plant", () => {
    const actions = {
      deletePlant: jest.fn()
    };

    const store = new Vuex.Store({
      actions
    });

    const wrapper = shallowMount(PlantCard, {
      propsData: {
        plant: mockPlant
      },
      stubs,
      localVue,
      store
    });

    wrapper.find(".plant-card__delete").trigger("click");
    expect(actions.deletePlant).toHaveBeenCalledWith(expect.any(Object), "123");
  });

  const dataset = [
    [7, [2020, 6, 23], 0],
    [7, [2020, 5, 20], 0],
    [10, [2020, 6, 25], 5],
    [10, [2020, 7, 15], 10],
    [8, [2020, 6, 30], 8],
    [8, [2020, 6, 29], 7],
    [1, [2020, 6, 29], 0],
    [1, [2020, 6, 30], 1]
  ];

  it.each(dataset)(
    `Should determine correct days remaining for %i days and %p as date`,
    (daysBetweenWatering, mockDate, expectedDaysRemaining) => {
      const plant = {
        name: "My Plant",
        lastWatered: Math.round(Date.UTC(...mockDate) / 1000),
        days: daysBetweenWatering
      };

      const wrapper = shallowMount(PlantCard, {
        propsData: {
          plant
        },
        stubs,
        localVue
      });

      expect(wrapper.vm.daysRemaining).toBe(expectedDaysRemaining);
    }
  );
});
