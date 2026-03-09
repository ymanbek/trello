import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addList } from "../../store/slices/listsSlice";

const AddList = ({ boardId }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleSubmit = () => {
    if (title.trim()) {
      dispatch(
        addList({
          boardId,
          title: title.trim(),
        })
      );
      setTitle("");
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setTitle("");
    }
  };

  if (!isAdding) {
    return (
      <AddListContainer>
        <AddButton onClick={() => setIsAdding(true)}>
          <span>+</span> Добавить список
        </AddButton>
      </AddListContainer>
    );
  }

  return (
    <AddListContainer>
      <Form>
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите имя колонки..."
        />
        <FormActions>
          <SubmitButton onClick={handleSubmit} disabled={!title.trim()}>
            Добавить список
          </SubmitButton>
          <CancelButton onClick={() => setIsAdding(false)}>x</CancelButton>
        </FormActions>
      </Form>
    </AddListContainer>
  );
};

export default AddList;

const AddListContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  width: 280px;
  min-width: 280px;
  padding: 4px;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  span {
    font-size: 20px;
  }
`;

const Form = styled.div`
  background: #f4f5f7;
  border-radius: 8px;
  padding: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #026aa7;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 8px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #6b778c;
  }
`;

const FormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubmitButton = styled.button`
  background: #026aa7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #0079bf;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b778c;
  font-size: 20px;
  padding: 4px 8px;

  &:hover {
    color: #172b4d;
  }
`;
