import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addCard } from "../../store/slices/cardsSlice";

const AddCard = ({ listId }) => {
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
        addCard({
          listId,
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
      <AddCardContainer>
        <AddButton onClick={() => setIsAdding(true)}>
          <span style={{ fontSize: "18px" }}>+</span> Добавить карточку
        </AddButton>
      </AddCardContainer>
    );
  }

  return (
    <AddCardContainer>
      <Form>
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите название карточки..."
        />
        <FormActions>
          <SubmitButton onClick={handleSubmit} disabled={!title.trim()}>
            Добавить карточку
          </SubmitButton>
          <CancelButton onClick={() => setIsAdding(false)}>x</CancelButton>
        </FormActions>
      </Form>
    </AddCardContainer>
  );
};

export default AddCard;

const AddCardContainer = styled.div`
  padding: 8px;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 8px;
  background: none;
  border: none;
  border-radius: 4px;
  color: #6b778c;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #172b4d;
  }
`;

const Form = styled.div`
  background: white;
  border-radius: 4px;
  padding: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #026aa7;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 8px;
  box-sizing: border-box;

  &:focus {
    outline: none;
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
