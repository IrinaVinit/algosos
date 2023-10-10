import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";
import renderer from "react-test-renderer";

const buttonText ="Click me";

describe("test Button component", ()=>{
    it("render with text", ()=>{
        const tree = renderer.create(<Button text={buttonText}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render without text", ()=>{
        const tree = renderer.create(<Button/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render desabled", ()=>{
        const tree = renderer.create(<Button disabled/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("loading", ()=>{
        const tree = renderer.create(<Button isLoader/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    
  it("call callback", () => {
    const click = jest.fn();
    render(<Button onClick={click} text={buttonText}/>);
    const button = screen.getByText(buttonText);
    fireEvent.click(button);
    expect(click).toHaveBeenCalledTimes(1);
  });
});


