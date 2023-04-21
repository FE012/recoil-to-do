import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { addCategoryState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IForm {
  addCategory: string;
}

const Form = styled.form`
  display: flex;
  input {
    font-family: "Cafe24SsurroundAir";
    padding: 0px 5px;
    width: 120px;
    border: none;
    border-radius: 5px;
    height: 30px;
    margin-right: 5px;
  }
  button {
    background-color: #769fcd;
    color: #deecfc;
    border: none;
    border-radius: 5px;
    height: 30px;
  }
`;

function CreateCategory() {
  const setAddCategory = useSetRecoilState(addCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ addCategory }: IForm) => {
    if (addCategory === "") {
      return;
    }
    setAddCategory((prev) => [{ title: addCategory, id: Date.now() }, ...prev]);
    setValue("addCategory", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input {...register("addCategory")} placeholder="카테고리 추가" />
      <button>
        <FontAwesomeIcon icon={faPlus} size="xl" />
      </button>
    </Form>
  );
}

export default CreateCategory;
