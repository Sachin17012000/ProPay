import React from "react";
import renderer from "react-test-renderer";
import ProfileDetailsCard from "./index";

describe("Filter Button Component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ProfileDetailsCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
