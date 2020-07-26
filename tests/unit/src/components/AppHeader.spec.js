import { createLocalVue, shallowMount } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader";

const localVue = createLocalVue();

describe("AppHeader component", () => {
  it("Should render correctly", () => {
    const wrapper = shallowMount(AppHeader, { localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
