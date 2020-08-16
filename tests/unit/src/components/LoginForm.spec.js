import { createLocalVue, shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm";
import Vuex from "vuex";
import { createStore } from "../../helpers";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("LoginForm component", () => {
  const defaultStoreOptions = {
    state: {
      loginErrors: []
    },
    actions: {
      login: jest.fn()
    }
  };

  it("Should render correctly", () => {
    const wrapper = shallowMount(LoginForm, {
      localVue,
      store: createStore(defaultStoreOptions),
      stubs: ["router-link"]
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should render any login errors", () => {
    const wrapper = shallowMount(LoginForm, {
      localVue,
      store: createStore(defaultStoreOptions, {
        state: {
          loginErrors: ["Invalid password"]
        }
      }),
      stubs: ["router-link"]
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should log user in", async () => {
    const expectedEmail = "test@user.com";
    const expectedPassword = "myPassword123";
    const $router = {
      push: jest.fn()
    };
    defaultStoreOptions.actions.login.mockImplementation(async () => true);

    const wrapper = shallowMount(LoginForm, {
      localVue,
      store: createStore(defaultStoreOptions),
      mocks: {
        $router
      },
      stubs: ["router-link"]
    });

    const inputs = wrapper.findAll("input[type=text]");

    inputs.at(0).setValue(expectedEmail);
    inputs.at(1).setValue(expectedPassword);

    wrapper.find("form").trigger("submit");
    await wrapper.vm.$nextTick();

    expect(defaultStoreOptions.actions.login).toHaveBeenCalledWith(
      expect.anything(),
      {
        email: expectedEmail,
        password: expectedPassword
      }
    );
    expect($router.push).toHaveBeenCalledWith("/");
  });
});
