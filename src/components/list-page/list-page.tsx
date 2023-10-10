import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./LinkedList";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { CircleElement } from "../../types/common-types";
import {
  addElementByIndex,
  addElementToHead,
  addElementToTail,
  getCircle,
  removeElementByIndex,
  removeElementFromHead,
  removeElementFromTail,
} from "./utils";

type ActiveElement = {
  isLoading: boolean;
  loadingAddHead: boolean;
  loadingAddTail: boolean;
  loadingRemoveHead: boolean;
  loadingRemoveTail: boolean;
  loadingAddIndex: boolean;
  loadingRemoveIndex: boolean;
};

const initialState = {
  isLoading: false,
  loadingAddHead: false,
  loadingAddTail: false,
  loadingRemoveHead: false,
  loadingRemoveTail: false,
  loadingAddIndex: false,
  loadingRemoveIndex: false,
};

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [isLoading, setIsLoading] = useState<ActiveElement>(initialState);
  const [listState, setListState] = useState<CircleElement[]>([]);

  const linkList = useMemo(() => new LinkedList<string>(), []);
  const initialArray = ["c", "o", "o", "l"];
  const newCircle = (
    <Circle data-cy="smallCircle" letter={value} state={ElementStates.Changing} isSmall />
  );

  const buttonDeleteDisaibled = !linkList.getSize() || isLoading.isLoading;
  const buttonAddByIndexDisaibled =
    !index || !value || Number(index) < 0 || linkList.getSize() - 1 < Number(index);
  const buttonDeleteByIndexDisaibled =
    !index || Number(index) < 0 || linkList.getSize() - 1 < Number(index);
  const buttonAddHeadTailDisaibled =
    !value || isLoading.isLoading || linkList.getSize() > 8;

  useEffect(() => {
    linkList.appendArray(initialArray);
    const initialList = initialArray.map((item, index) =>
      getCircle(linkList, item, index)
    );
    setListState(initialList);
  }, []);

  const onChangeValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };
  const onChangeIndex = (evt: ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  };

  async function visualiseAddingElementToHead() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: true,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    setValue("");
    setIndex("");
    await addElementToHead(linkList, value, 0, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseAddingElementToTail() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: true,
      loadingRemoveHead: false,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    setValue("");
    setIndex("");
    await addElementToTail(linkList, value, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseAddingElementByIndex(index: number) {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: false,
      loadingAddIndex: true,
      loadingRemoveIndex: false,
    });
    setValue("");
    setIndex("");
    await addElementByIndex(linkList, value, index, newCircle, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseRemovingElementFromHead() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: true,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    setIndex("");
    await removeElementFromHead(linkList, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseRemovingElementFromTail() {
    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: true,
      loadingAddIndex: false,
      loadingRemoveIndex: false,
    });
    setIndex("");
    await removeElementFromTail(linkList, listState, setListState);
    setIsLoading(initialState);
  }

  async function visualiseRemovingElementByIndex(index: number) {
    if (index === 0) {
      visualiseRemovingElementFromHead();
      return;
    }
    if (index === listState.length - 1) {
      visualiseRemovingElementFromTail();
      return;
    }

    setIsLoading({
      isLoading: true,
      loadingAddHead: false,
      loadingAddTail: false,
      loadingRemoveHead: false,
      loadingRemoveTail: false,
      loadingAddIndex: false,
      loadingRemoveIndex: true,
    });
    setIndex("");
    await removeElementByIndex(index, linkList, listState, setListState);
    setIsLoading(initialState);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.controlsList}>
          <Input
            isLimitText
            maxLength={4}
            value={value}
            data-cy="input-value"
            onChange={onChangeValue}
            placeholder="Введите значение"
          />
          <Button
            text="Добавить в head"
            isLoader={isLoading.loadingAddHead}
            disabled={buttonAddHeadTailDisaibled}
            data-cy="button-list-addHead"
            onClick={visualiseAddingElementToHead}
          />
          <Button
            text="Добавить в tail"
            isLoader={isLoading.loadingAddTail}
            disabled={buttonAddHeadTailDisaibled}
            data-cy="button-list-addTail"
            onClick={visualiseAddingElementToTail}
          />
          <Button
            text="Удалить из head"
            isLoader={isLoading.loadingRemoveHead}
            data-cy="button-list-removeHead"
            disabled={buttonDeleteDisaibled}
            onClick={visualiseRemovingElementFromHead}
          />
          <Button
            text="Удалить из tail"
            isLoader={isLoading.loadingRemoveTail}
            disabled={buttonDeleteDisaibled}
            data-cy="button-list-removeTail"
            onClick={visualiseRemovingElementFromTail}
          />
          <Input
            type="number"
            min={0}
            max={listState.length}
            value={index}
            data-cy="input-index"
            onChange={onChangeIndex}
            placeholder="Введите индекс"
          />
          <Button
            extraClass={styles.addIndex}
            isLoader={isLoading.loadingAddIndex}
            text="Добавить по индексу"
            data-cy="button-list-addIndex"
            disabled={buttonAddByIndexDisaibled}
            onClick={() => visualiseAddingElementByIndex(Number(index))}
          />
          <Button
            extraClass={styles.removeIndex}
            text="Удалить по индексу"
            isLoader={isLoading.loadingRemoveIndex}
            data-cy="button-list-removeIndex"
            disabled={buttonDeleteByIndexDisaibled}
            onClick={() => visualiseRemovingElementByIndex(Number(index))}
          />
        </div>
        <ul className={styles.lineList}>
          {listState &&
            listState.map((item, index) => (
              <li className={styles.circle} key={index}>
                <Circle
                  letter={item.item}
                  index={index}
                  head={item.head}
                  tail={item.tail}
                  state={item.state}
                />
                {index < listState.length - 1 && <ArrowIcon />}
              </li>
            ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
