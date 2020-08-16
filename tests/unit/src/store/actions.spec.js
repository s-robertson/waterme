import actions from "@/store/actions";
import storage from "@/services/appStorage";

jest.mock("@/store/storage/repository", () => ({
  init: jest.fn(),
  fetchPlants: jest.fn(),
  addPlant: jest.fn(),
  deletePlant: jest.fn(),
  updatePlant: jest.fn()
}));

describe("vuex actions", () => {
  const commit = jest.fn();

  describe("init", () => {
    it("should commit all expected mutations", async () => {
      const state = {};
      const expectedPlants = [{ name: "My Plant" }];

      storage.fetchPlants.mockImplementation(() => expectedPlants);
      await actions.init({ commit, state });

      expect(storage.init).toHaveBeenCalled();
      expect(storage.fetchPlants).toHaveBeenCalled();
      expect(commit.mock.calls).toEqual([
        ["setPlants", expectedPlants],
        ["appLoaded"]
      ]);
    });
  });

  describe("addPlant", () => {
    it("should commit all expected mutations", async () => {
      const expectedPlant = {
        id: "123",
        name: "My Plant",
        days: 5,
        lastWatered: 0
      };

      storage.addPlant.mockImplementation(() => expectedPlant.id);

      await actions.addPlant(
        { commit },
        { name: expectedPlant.name, days: expectedPlant.days }
      );

      expect(storage.addPlant).toHaveBeenCalledWith({
        name: expectedPlant.name,
        days: expectedPlant.days,
        lastWatered: expectedPlant.lastWatered
      });

      expect(commit.mock.calls).toEqual([["addPlant", expectedPlant]]);
    });
  });

  describe("deletePlant", () => {
    it("should commit correct mutations", async () => {
      const expectedId = "123";
      await actions.deletePlant({ commit }, expectedId);

      expect(storage.deletePlant).toHaveBeenCalledWith(expectedId);
      expect(commit.mock.calls).toEqual([["deletePlant", expectedId]]);
    });
  });

  describe("updatePlant", () => {
    it("should commit correct mutations", async () => {
      const expectedId = "123";
      const expectedData = {
        name: "My Plant",
        lastWatered: 1234
      };

      await actions.updatePlant(
        { commit },
        {
          id: expectedId,
          data: expectedData
        }
      );

      expect(storage.updatePlant).toHaveBeenCalledWith(
        expectedId,
        expectedData
      );
      expect(commit.mock.calls).toEqual([
        ["updatePlant", { id: expectedId, data: expectedData }]
      ]);
    });
  });

  describe("waterPlants", () => {
    const mockTimestamp = 123456789000;
    Date.now = jest.fn(() => mockTimestamp);

    it("should commit correct mutations", async () => {
      const expectedIds = ["123", "456"];
      const expectedData = {
        lastWatered: 123456789
      };

      await actions.waterPlants({ commit }, expectedIds);
      expect(storage.updatePlant.mock.calls).toEqual([
        [expectedIds[0], expectedData],
        [expectedIds[1], expectedData]
      ]);
      expect(commit.mock.calls).toEqual([
        ["updatePlant", { id: expectedIds[0], data: expectedData }],
        ["updatePlant", { id: expectedIds[1], data: expectedData }]
      ]);
    });
  });
});
