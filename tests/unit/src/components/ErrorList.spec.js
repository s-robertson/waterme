import { createLocalVue, shallowMount } from "@vue/test-utils";
import ErrorList from "@/components/ErrorList";

const localVue = createLocalVue();

describe("ErrorList component", () => {
  it("Should render a list of error message", () => {
    const wrapper = shallowMount(ErrorList, {
      localVue,
      propsData: {
        errors: ["Error message one", "Error message two"]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should only render an aria-live region when there are no errors", () => {
    const wrapper = shallowMount(ErrorList, {
      localVue
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
