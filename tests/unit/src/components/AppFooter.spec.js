import { shallowMount } from "@vue/test-utils";
import AppFooter from "@/components/AppFooter";

describe("AppFooter component", () => {
  it("Should render correctly", () => {
    const wrapper = shallowMount(AppFooter);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
