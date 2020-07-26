import { createLocalVue, shallowMount } from "@vue/test-utils";
import AppFooter from "@/components/AppFooter";

const localVue = createLocalVue();

describe("AppFooter component", () => {
  it("Should render correctly", () => {
    const wrapper = shallowMount(AppFooter, { localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
