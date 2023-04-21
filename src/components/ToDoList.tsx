import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  addCategoryState,
  Categories,
  categoryState,
  toDoSelector,
} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

// interface IForm {
//   toDo: string;
// }

// interface IToDo {
//   text: string;
//   id: number;
//   category: "TO_DO" | "DOING" | "DONE";
// }

// const toDoState = atom<IToDo[]>({
//   key: "toDo",
//   default: [],
//   // key: 고유한 값, default: 기본 값
// });

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  h1 {
    font-size: 30px;
    padding: 30px 0px;
  }
  header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    select {
      font-family: "Cafe24SsurroundAir";
      font-size: 15px;
      margin-left: 5px;
      margin-right: 10px;
      border: none;
      border-radius: 5px;
      height: 30px;
      max-width: 100px;
    }
  }
`;

const CategoryTitle = styled.div`
  max-width: 300px;
`;

function ToDoList() {
  // useRecoilState(atom) :value와 변경 함수 둘다 얻을때 쓰는 함수
  // useRecoilValue(atom) :atom 값을 불러오기 위해 쓰는 함수
  // useSetRecoilState(atom) :atom 값을 변경하기 위해 쓰는 함수
  // const toDos = useRecoilValue(toDoState);
  // const selectorOutput = useRecoilValue(toDoSelector);
  // console.log(selectorOutput);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState); //['TO_DO', ƒ]
  const addCategory = useRecoilValue(addCategoryState);
  const addCategoryFunc = () => {
    const addCategories = addCategory.map((category) => {
      return (
        <option key={category.id} value={category.title}>
          {category.title}
        </option>
      );
    });
    return addCategories;
  };
  addCategory.map((category) => {
    <option key={category.id} value={category.title}>
      {category.title}
    </option>;
  });

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  console.log(toDos);
  //모든 validation을 통과해야 작동되는 함수 -> CreateToDo.tsx로 옮김
  // const handleValid = ({ toDo }: IForm) => {
  //   // console.log("add to do", data.toDo);
  //   setToDos((oldToDos) => [
  //     { text: toDo, id: Date.now(), category: "TO_DO" },
  //     ...oldToDos,
  //   ]);
  //   setValue("toDo", "");
  // };
  // console.log(toDos);

  return (
    <Container>
      <h1>To Dos ☁️</h1>
      <header>
        분류:
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
          {addCategoryFunc()}
        </select>
        <CreateCategory />
      </header>
      <main>
        <CreateToDo />
        {/* <CategoryTitle>{category}</CategoryTitle> */}
        <ul>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
        {/* <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr /> */}
      </main>
    </Container>
  );
}

export default ToDoList;
