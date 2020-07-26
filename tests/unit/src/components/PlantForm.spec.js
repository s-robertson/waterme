import { createLocalVue, shallowMount } from "@vue/test-utils";
import PlantForm from "@/components/PlantForm";

const localVue = createLocalVue();

describe("PlantForm component", () => {
  it("Should render correctly", () => {
    const wrapper = shallowMount(PlantForm, { localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
