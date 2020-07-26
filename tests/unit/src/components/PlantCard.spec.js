import MockDate from "mockdate";
import moment from "moment";
import { shallowMount } from "@vue/test-utils";
import PlantCard from "@/components/PlantCard";

describe("PlantCard component", () => {
  beforeAll(() => {
    MockDate.set("2020-07-30");
  });

  afterAll(() => {
    MockDate.reset();
  });

  it("Should render correctly", () => {
    const mockPlant = {
      name: "My Plant",
      lastWatered: moment.utc("2020-07-25").unix(),
      days: 10
    };
    const wrapper = shallowMount(PlantCard, {
      propsData: {
        plant: mockPlant
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  const dataset = [
    [7, "2020-07-23", 0],
    [7, "2020-06-20", 0],
    [10, "2020-07-25", 5],
    [10, "2020-08-15", 10],
    [8, "2020-07-30", 8],
    [8, "2020-07-29", 7],
    [1, "2020-07-29", 0],
    [1, "2020-07-30", 1]
  ];

  it.each(dataset)(
    `Should determine correct days remaining for %i days and %s as date`,
    (daysBetweenWatering, mockDate, expectedDaysRemaining) => {
      const mockPlant = {
        name: "My Plant",
        lastWatered: moment.utc(mockDate).unix(),
        days: daysBetweenWatering
      };

      const wrapper = shallowMount(PlantCard, {
        propsData: {
          plant: mockPlant
        }
      });

      expect(wrapper.vm.daysRemaining).toBe(expectedDaysRemaining);
    }
  );
});
