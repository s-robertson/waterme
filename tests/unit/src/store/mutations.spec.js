import mutations from "@/store/mutations";
import MockDate from "mockdate";

describe("mutations", () => {
  describe("addPlant", () => {
    it("should add new plant to state", () => {
      const state = { plants: [] };
      const plant = { name: "My Plant" };
      mutations.addPlant(state, plant);
      expect(state.plants[0]).toEqual(plant);
    });
  });

  describe("deletePlant", () => {
    it("should delete plant by ID", () => {
      const state = {
        plants: [
          { id: "123", name: "My Plant 1" },
          { id: "456", name: "My Plant 2" }
        ]
      };
      const expectedState = {
        plants: [{ id: "456", name: "My Plant 2" }]
      };
      mutations.deletePlant(state, "123");
      expect(state).toEqual(expectedState);
    });
  });

  describe("updatePlant", () => {
    it("should update plant by ID", () => {
      const state = {
        plants: [
          { id: "123", name: "My Plant 1", days: 6 },
          { id: "456", name: "My Plant 2", days: 7 }
        ]
      };
      const updatedPlant = { id: "123", name: "My Plant 1 Updated", days: 2 };
      const expectedState = {
        plants: [updatedPlant, { id: "456", name: "My Plant 2", days: 7 }]
      };

      mutations.updatePlant(state, updatedPlant);
      expect(state).toEqual(expectedState);
    });
  });

  describe("waterPlant", () => {
    it("should mark plant as watered", () => {
      MockDate.set("2020-07-27");
      const state = {
        plants: [
          { id: "123", name: "My Plant 1", days: 6, lastWatered: 1234567 }
        ]
      };
      const expectedState = {
        plants: [
          { id: "123", name: "My Plant 1", days: 6, lastWatered: 1595808000 }
        ]
      };

      mutations.waterPlant(state, "123");
      expect(state).toEqual(expectedState);
      MockDate.reset();
    });
  });
});
