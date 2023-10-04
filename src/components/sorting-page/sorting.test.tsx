import { Direction } from "../../types/direction";
import { sortSelection, bubbleSorting } from "./utils";
import { ElementStates } from "../../types/element-states";

const arr = [
  { item: 3, state: ElementStates.Default },
  { item: 0, state: ElementStates.Default },
  { item: 4, state: ElementStates.Default },
];
const sortedArrAsc = [
  { item: 0, state: ElementStates.Modified},
  { item: 3, state: ElementStates.Modified},
  { item: 4, state: ElementStates.Modified},
];
const sortedArrDesc = [
  { item: 4, state: ElementStates.Modified},
  { item: 3, state: ElementStates.Modified},
  { item: 0, state: ElementStates.Modified},
]

describe("Test of Sorting Component", () => {
  test("сортировка выбором по возрастанию", async () => {
    expect(await sortSelection(arr, Direction.Ascending)).toEqual(sortedArrAsc);
  });
  test("сортировка выбором по убыванию", async () => {
    expect(await sortSelection(arr, Direction.Descending)).toEqual(sortedArrDesc);
  });
  test("сортировка пузырьком по возрастанию", async () => {
    expect(await bubbleSorting(arr, Direction.Ascending)).toEqual(sortedArrAsc);
  });
  test("сортировка пузырьком по убыванию", async () => {
    expect(await bubbleSorting(arr, Direction.Descending)).toEqual(sortedArrDesc);
  });
});
