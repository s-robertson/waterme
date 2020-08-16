import { shallowMount, createLocalVue } from "@vue/test-utils";
import ButtonLogout from "@/components/ButtonLogout";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ButtonLogout component", () => {
  const storeOptions = {
    state: {
      authenticated: false
    },
    actions: {
      logout: jest.fn()
    }
  };

  const getStore = (options = {}) => {
    return new Vuex.Store({
      ...storeOptions,
      ...options
    });
  };

  it("Should not display button when not authenticated", () => {
    const wrapper = shallowMount(ButtonLogout, {
      localVue,
      store: getStore()
    });

    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("Should display logout button when authenticated", () => {
    const wrapper = shallowMount(ButtonLogout, {
      localVue,
      store: getStore({
        state: {
          authenticated: true
        }
      })
    });

    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("Should log out when the button is clicked", () => {
    const $router = {
      currentRoute: { fullPath: "/my-path" },
      push: jest.fn()
    };

    const wrapper = shallowMount(ButtonLogout, {
      localVue,
      store: getStore({
        state: {
          authenticated: true
        }
      }),
      mocks: {
        $router
      }
    });

    wrapper.find("button").trigger("click");
    expect(storeOptions.actions.logout).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith("/");
  });
});
