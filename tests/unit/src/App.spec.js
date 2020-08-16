import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "@/App";
import { createStore } from "../helpers";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("App Component", () => {
  const defaultStoreOptions = {
    state: {
      loading: false
    },
    actions: {
      init: jest.fn()
    }
  };

  const router = new VueRouter();

  it("should render correctly", () => {
    const wrapper = shallowMount(App, {
      store: createStore(defaultStoreOptions),
      localVue,
      router
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should display a loading message while the app is loading", () => {
    const wrapper = shallowMount(App, {
      store: createStore(defaultStoreOptions, { state: { loading: true } }),
      localVue,
      router
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
