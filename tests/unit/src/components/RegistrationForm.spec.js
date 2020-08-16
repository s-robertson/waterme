import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import RegistrationForm from "@/components/RegistrationForm";
import { createStore } from "../../helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("RegistrationForm component", () => {
  const defaultStoreOptions = {
    state: {
      registrationErrors: []
    },
    actions: {
      register: jest.fn()
    }
  };

  it("Should render correctly", () => {
    const wrapper = shallowMount(RegistrationForm, {
      localVue,
      store: createStore(defaultStoreOptions)
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should display any registration errors", () => {
    const wrapper = shallowMount(RegistrationForm, {
      localVue,
      store: createStore(defaultStoreOptions, {
        state: { registrationErrors: ["Invalid email"] }
      })
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should register a new user", async () => {
    const expectedEmail = "test@user.com";
    const expectedPassword = "myPassword123";
    defaultStoreOptions.actions.register.mockImplementation(async () => {
      return true;
    });
    const $router = {
      push: jest.fn()
    };

    const wrapper = shallowMount(RegistrationForm, {
      localVue,
      store: createStore(defaultStoreOptions),
      mocks: {
        $router
      }
    });

    wrapper.find("input[type=text]").setValue(expectedEmail);
    wrapper.find("input[type=password]").setValue(expectedPassword);
    wrapper.find("form").trigger("submit");

    await wrapper.vm.$nextTick();

    expect($router.push).toHaveBeenCalledWith("/");
    expect(defaultStoreOptions.actions.register).toHaveBeenCalledWith(
      expect.anything(),
      {
        email: expectedEmail,
        password: expectedPassword
      }
    );
  });
});
