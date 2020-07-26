import { shallowMount } from "@vue/test-utils";
import PlantForm from "@/components/PlantForm";

describe("PlantForm component", () => {
  it("Should render correctly", () => {
    const wrapper = shallowMount(PlantForm);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
