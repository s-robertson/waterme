import actions from "@/store/actions";
import appStorage from "@/services/appStorage";
import auth from "@/services/auth";

jest.mock("@/services/appStorage", () => ({
  fetchPlants: jest.fn(),
  addPlant: jest.fn(),
  deletePlant: jest.fn(),
  updatePlant: jest.fn()
}));

jest.mock("@/services/auth", () => ({
  logout: jest.fn(),
  login: jest.fn(),
  register: jest.fn()
}));

describe("vuex actions", () => {
  const commit = jest.fn();

  describe("login", () => {
    it("should commit correct mutations when successfully logging in", async () => {
      const expectedEmail = "test@user.com";
      const expectedPassword = "password123";

      auth.login.mockImplementation(async () => true);
      await actions.login(
        { commit },
        { email: expectedEmail, password: expectedPassword }
      );

      expect(auth.login).toHaveBeenCalledWith(expectedEmail, expectedPassword);
      expect(commit.mock.calls).toEqual([["authenticated"]]);
    });

    it("should commit correct mutations when there are authentication errors", async () => {
      const expectedErrors = ["Error One", "Error Two"];

      auth.login.mockImplementation(async () => {
        throw {
          messages: expectedErrors
        };
      });
      await actions.login({ commit }, { email: "", password: "" });

      expect(commit.mock.calls).toEqual([["setLoginErrors", expectedErrors]]);
    });
  });

  describe("logout", () => {
    it("should commit expected mutations", async () => {
      await actions.logout({ commit });
      expect(auth.logout).toHaveBeenCalled();
      expect(commit.mock.calls).toEqual([["authenticated", false]]);
    });
  });

  describe("register", () => {
    it("should commit correct mutations when successfully registering", async () => {
      const expectedEmail = "test@user.com";
      const expectedPassword = "password123";

      auth.login.mockImplementation(async () => true);
      await actions.register(
        { commit },
        { email: expectedEmail, password: expectedPassword }
      );

      expect(auth.register).toHaveBeenCalledWith(
        expectedEmail,
        expectedPassword
      );
      expect(commit.mock.calls).toEqual([["registered"]]);
    });

    it("should commit correct mutations when there are registration errors", async () => {
      const expectedErrors = ["Error One", "Error Two"];

      auth.register.mockImplementation(async () => {
        throw {
          messages: expectedErrors
        };
      });
      await actions.register({ commit }, { email: "", password: "" });

      expect(commit.mock.calls).toEqual([
        ["setRegistrationErrors", expectedErrors]
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

      appStorage.addPlant.mockImplementation(() => expectedPlant.id);

      await actions.addPlant(
        { commit },
        { name: expectedPlant.name, days: expectedPlant.days }
      );

      expect(appStorage.addPlant).toHaveBeenCalledWith({
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

      expect(appStorage.deletePlant).toHaveBeenCalledWith(expectedId);
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

      expect(appStorage.updatePlant).toHaveBeenCalledWith(
        expectedId,
        expectedData
      );
      expect(commit.mock.calls).toEqual([
        ["updatePlant", { id: expectedId, data: expectedData }]
      ]);
    });
  });

  describe("waterPlants", () => {
    it("should commit correct mutations", async () => {
      const mockTimestamp = 123456789000;
      Date.now = jest.fn(() => mockTimestamp);

      const expectedIds = ["123", "456"];
      const expectedData = {
        lastWatered: 123456789
      };

      await actions.waterPlants({ commit }, expectedIds);
      expect(appStorage.updatePlant.mock.calls).toEqual([
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
