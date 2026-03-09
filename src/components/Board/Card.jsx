import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteCard, updateCard } from "../../store/slices/cardsSlice";

const Card = ({ card, listId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteCard({ listId, cardId: card.id }));
  };

  const handleUpdate = () => {
    if (title.trim() && title !== card.title) {
      dispatch(
        updateCard({
          listId,
          cardId: card.id,
          updates: { title: title.trim() },
        })
      );
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    } else if (e.key === "Escape") {
      setTitle(card.title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleUpdate}
        onKeyDown={handleKeyDown}
        autoFocus
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "2px solid #026AA7",
          borderRadius: "4px",
          fontSize: "14px",
          marginBottom: "8px",
          boxSizing: "border-box",
        }}
      />
    );
  }

  return (
    <CardContainer
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <CardTitle>{card.title}</CardTitle>
      <CardFooter>
        <ActionButton onClick={() => setIsEditing(true)}>✎</ActionButton>
        <ActionButton danger onClick={handleDelete}>
          ×
        </ActionButton>
      </CardFooter>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  background: white;
  border-radius: 4px;
  padding: 10px 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: ${(props) => (props.isDragging ? "grabbing" : "grab")};
  border: 1px solid #e1e4e8;
  transform: ${(props) => props.transform};
  transition: ${(props) => props.transition};
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};

  &:hover {
    background: #fafbfc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #172b4d;
  word-break: break-word;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b778c;
  padding: 2px;
  font-size: 16px;

  &:hover {
    color: ${(props) => (props.danger ? "#E03C31" : "#172B4D")};
  }
`;
