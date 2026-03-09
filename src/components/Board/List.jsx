import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "./Card";
import AddCard from "./AddCard";
import { deleteList, updateListTitle } from "../../store/slices/listsSlice";

const List = ({ list, boardId, cards, onCardDragEnd }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [activeCardId, setActiveCardId] = useState(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTitleSubmit = () => {
    if (title.trim() && title !== list.title) {
      dispatch(
        updateListTitle({
          boardId,
          listId: list.id,
          title: title.trim(),
        })
      );
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setTitle(list.title);
      setIsEditing(false);
    }
  };

  const handleDeleteList = () => {
    dispatch(deleteList({ boardId, listId: list.id }));
  };

  const handleCardDragStart = (event) => {
    setActiveCardId(event.active.id);
  };

  const handleCardDragEnd = (event) => {
    setActiveCardId(null);
    onCardDragEnd(event, list.id);
  };

  return (
    <ListContainer ref={setNodeRef} style={style} isDragging={isDragging}>
      <ListHeader {...attributes} {...listeners}>
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              fontWeight: 600,
              fontSize: "15px",
              border: "2px solid #026AA7",
              borderRadius: "4px",
              padding: "2px 4px",
              width: "100%",
            }}
          />
        ) : (
          <ListTitle onDoubleClick={() => setIsEditing(true)}>
            {list.title}
          </ListTitle>
        )}

        <ListActions>
          <ActionButton onClick={handleDeleteList}>×</ActionButton>
        </ListActions>
      </ListHeader>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleCardDragStart}
        onDragEnd={handleCardDragEnd}
      >
        <SortableContext
          items={cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          <CardsContainer>
            {cards.map((card) => (
              <Card key={card.id} card={card} listId={list.id} />
            ))}
          </CardsContainer>
        </SortableContext>
        <DragOverlay>
          {activeCardId ? (
            <div
              style={{
                padding: "8px",
                background: "white",
                borderRadius: "4px",
              }}
            >
              ...
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AddCard listId={list.id} boardId={boardId} />
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  background: #f4f5f7;
  border-radius: 8px;
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: ${(props) => props.transform};
  transition: ${(props) => props.transition};
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;

const ListHeader = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e1e4e8;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const ListTitle = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: #172b4d;
`;

const ListActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b778c;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #172b4d;
  }
`;

const CardsContainer = styled.div`
  flex: 1;
  padding: 8px;
  min-height: 100px;
`;
