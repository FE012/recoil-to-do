import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const Form = styled.form`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  input {
    font-family: "Cafe24SsurroundAir";
    width: 85%;
    height: 45px;
    border: none;
    border-radius: 5px;
    margin-right: 5px;
    text-align: center;
  }
  input::placeholder {
    font-size: 16px;
  }
  button {
    font-family: "Cafe24SsurroundAir";
    background-color: #769fcd;
    color: #deecfc;
    border: none;
    border-radius: 5px;
    width: 15%;
    height: 45px;
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    // console.log("add to do", data.toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="오늘의 할 일은 무엇인가요?"
      />

      <button>입력</button>
    </Form>
  );
}

export default CreateToDo;
