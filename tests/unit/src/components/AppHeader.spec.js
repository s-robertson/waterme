import { shallowMount } from "@vue/test-utils";
import AppHeader from "@/components/AppHeader";

describe("AppHeader component", () => {
  it("Should render correctly", () => {
    const wrapper = shallowMount(AppHeader);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
