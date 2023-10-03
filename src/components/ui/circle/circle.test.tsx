import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

const letter ="T";
const string = 'string'
const element = <div><h1>element</h1></div>
const number = 5;


describe("test Circle component", ()=>{
    it("render without letter", ()=>{
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with letter", ()=>{
        const tree = renderer.create(<Circle letter={letter}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with head-string", ()=>{
        const tree = renderer.create(<Circle head={string}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with head-element", ()=>{
        const tree = renderer.create(<Circle head={element}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with tail-string", ()=>{
        const tree = renderer.create(<Circle tail={string}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with tail-element", ()=>{
        const tree = renderer.create(<Circle tail={element}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with index", ()=>{
        const tree = renderer.create(<Circle index={number}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with isSmall", ()=>{
        const tree = renderer.create(<Circle isSmall/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with default state", ()=>{
        const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with changing state", ()=>{
        const tree = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
    it("render with modified state", ()=>{
        const tree = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
});
