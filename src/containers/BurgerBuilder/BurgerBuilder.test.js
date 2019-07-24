import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onSetIngredients={() => {}} />);
  });

  it("Should Render <BurgerControls /> if Ingredients", () => {
    wrapper.setProps({ ingredients: { salad: 0 } });
    expect(wrapper.find(BurgerControls)).toHaveLength(1);
  });
});
