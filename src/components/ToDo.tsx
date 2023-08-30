import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Li = styled.li`
  border: 1px solid #769fcd;
  border-radius: 5px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  button {
    background-color: #769fcd;
    border: none;
    border-radius: 5px;
    width: 80px;
    height: 30px;
    margin-right: 5px;
    font-family: "Cafe24SsurroundAir";
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  button:hover {
    cursor: pointer;
  }
`;

const TextArea = styled.textarea`
  font-family: "Cafe24SsurroundAir";
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  outline: none;
  transition: width 0.2s ease-in-out; /* Smooth transition effect */
`;

function ToDo({ text, category, id }: IToDo) {
  // console.log("props로 받은 id:", id);
  const setToDos = useSetRecoilState(toDoState);
  const [areaText, setareaText] = useState(text);

  //newCategory: IToDo["category"]
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      console.log("oldToDos:", oldToDos);
      // console.log("선택한 요소의 id:", id);
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      console.log("targetIndex:", targetIndex);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const filter = oldToDos.filter((toDo) => toDo.id !== id);
      return [...filter];
    });
  };

  //toDoList 수정버튼 event
  const handleUpdateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text: areaText, id, category };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <Li>
      {/* 카테고리가 "DOING"이 아닐 때만, Doing 버튼을 보여줄 거임  */}
      <TextArea
        value={areaText}
        onChange={(e) => setareaText(e.currentTarget.value)}
        rows={8}
        cols={40}
        style={{ resize: "vertical" }}
      />
      <ButtonBox>
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            진행 중{" "}
            <FontAwesomeIcon icon={faSpinner} style={{ color: "#f7c8e0" }} />
          </button>
        )}
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            할 일{" "}
            <FontAwesomeIcon icon={faListUl} style={{ color: "#3C486B" }} />
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            끝낸 일{" "}
            <FontAwesomeIcon
              icon={faSquareCheck}
              style={{ color: "#C7E9B0" }}
            />
          </button>
        )}
        <button onClick={handleUpdateClick}>
          수정완료{" "}
          <FontAwesomeIcon icon={faWrench} style={{ color: "#9F0D7F" }} />
        </button>
        <button onClick={handleDeleteClick}>
          삭제{" "}
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#F6BA6F" }} />
        </button>
      </ButtonBox>
    </Li>
  );
}

export default ToDo;
