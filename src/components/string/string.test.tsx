import { changeElements } from "../../utils/utils";


const arrEven = ['q', 'w', 'e', 'r', 'y'];
const reverseArrEven = ['y', 'r', 'e', 'w', 'q'];
const arrOdd = ['q', 'w', 'e', 'r', 't', 'y'];
const reverseArrOdd = ['y', 't', 'r', 'e', 'w', 'q']


describe("Test of String Component", ()=>{
    test("нечетное количество символов", async ()=>{
        await changeElements(arrEven, 0, arrEven.length-1).then(res => {
        expect(res).toEqual(reverseArrEven);
       })
    })
    test("пустая строка", async ()=>{
       await changeElements([''], 0, 0).then(res => {
        expect(res).toEqual(['']);
       })
    })
    test("четное количество символов", async ()=>{
        await changeElements(arrOdd, 0, arrOdd.length-1).then(res => {
        expect(res).toEqual(reverseArrOdd);
       })
    })
    test("с одним символом", async ()=>{
        await changeElements(['Q'], 0, ['Q'].length-1).then(res => {
        expect(res).toEqual(['Q']);
       })
    })
});