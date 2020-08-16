import mutations from "@/store/mutations";

describe("mutations", () => {
  describe("authenticated", () => {
    const dataset = [
      [true, []],
      [false, [false]]
    ];

    it.each(dataset)(
      "should set authenticated status to %p with args %p",
      (expected, args) => {
        const state = { authenticated: null };
        mutations.authenticated(state, ...args);
        expect(state.authenticated).toBe(expected);
      }
    );
  });

  describe("setLoginErrors", () => {
    it("should set login errors", () => {
      const expectedErrors = ["Error One", "Error Two"];
      const state = { loginErrors: [] };
      mutations.setLoginErrors(state, expectedErrors);
      expect(state.loginErrors).toEqual(expectedErrors);
    });
  });

  describe("setRegistrationErrors", () => {
    it("should set registration errors", () => {
      const expectedErrors = ["Error One", "Error Two"];
      const state = { registrationErrors: [] };
      mutations.setRegistrationErrors(state, expectedErrors);
      expect(state.registrationErrors).toEqual(expectedErrors);
    });
  });

  describe("appLoaded", () => {
    it("should update state to indicate loading is done", () => {
      const state = { loading: true };
      mutations.appLoaded(state);
      expect(state.loading).toBe(false);
    });
  });

  describe("registered", () => {
    it("should update state to indicate the user has registered", () => {
      const state = { registered: false };
      mutations.registered(state);
      expect(state.registered).toBe(true);
    });
  });

  describe("setPlants", () => {
    it("should update plant list", () => {
      const state = {
        plants: []
      };

      const expectedPlants = [{ name: "My Plant" }];

      mutations.setPlants(state, expectedPlants);
      expect(state.plants).toEqual(expectedPlants);
    });
  });

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

      mutations.updatePlant(state, {
        id: "123",
        data: {
          name: "My Plant 1 Updated",
          days: 2
        }
      });
      expect(state).toEqual(expectedState);
    });
  });
});
