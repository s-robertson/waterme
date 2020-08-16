import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import AppHeader from "@/components/AppHeader";

const localVue = createLocalVue();

localVue.use(VueRouter);

describe("AppHeader component", () => {
  it("Should render correctly", () => {
    const wrapper = shallowMount(AppHeader, { localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
