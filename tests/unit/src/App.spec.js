import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "@/App";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("App Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockActions = {
    init: jest.fn()
  };

  const getStore = (state = {}) => {
    return new Vuex.Store({
      state: {
        ...{
          loading: false
        },
        ...state
      },
      actions: mockActions
    });
  };

  const router = new VueRouter();

  it("should render correctly", () => {
    const wrapper = shallowMount(App, {
      store: getStore(),
      localVue,
      router
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should initialize the app upon being mounted", () => {
    shallowMount(App, {
      store: getStore(),
      localVue,
      router
    });
    expect(mockActions.init).toHaveBeenCalled();
  });

  it("should display a loading message while the app is loading", () => {
    const wrapper = shallowMount(App, {
      store: getStore({ loading: true }),
      localVue,
      router
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockActions.init).toHaveBeenCalled();
  });
});
