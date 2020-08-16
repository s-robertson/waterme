import { createLocalVue, shallowMount } from "@vue/test-utils";
import OptionButtons from "@/components/OptionButtons";

const localVue = createLocalVue();

describe("OptionButtons component", () => {
  it("Should render with slotted children", () => {
    const wrapper = shallowMount(OptionButtons, {
      localVue,
      slots: {
        default: "hello there"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
