import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

// type categories = "TO_DO" | "DOING" | "DONE";

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export interface IAddCategory {
  title: string;
  id: number;
}

export const addCategoryState = atom<IAddCategory[]>({
  key: "addCategory",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
  // key: 고유한 값, default: 기본 값
});

//toDos:[{text: '1', id: 1681700696781, category: 'TO_DO'}]
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
    //[[],[],[]] 이런 형식
    // return [
    //   toDos.filter((toDo) => toDo.category === "TO_DO"),
    //   toDos.filter((toDo) => toDo.category === "DOING"),
    //   toDos.filter((toDo) => toDo.category === "DONE"),
    // ];
  },
});
