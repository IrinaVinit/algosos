import { changeElements } from "../../utils/utils";

const arrEven = ["q", "w", "e", "r", "y"];
const reverseArrEven = ["y", "r", "e", "w", "q"];
const arrOdd = ["q", "w", "e", "r", "t", "y"];
const reverseArrOdd = ["y", "t", "r", "e", "w", "q"];

describe("Test of String Component", () => {
  test("нечетное количество символов", async () => {
    expect(await changeElements(arrEven, 0, arrEven.length - 1)).toEqual(reverseArrEven);
  });
  test("четное количество символов", async () => {
    expect(await changeElements(arrOdd, 0, arrOdd.length - 1)).toEqual(reverseArrOdd);
  });
  test("с одним символом", async () => {
    expect(await changeElements(["Q"], 0, ["Q"].length - 1)).toEqual(["Q"]);
  });
  test("пустая строка", async () => {
    expect(await changeElements([], 0, 0)).toEqual([]);
  });
});
