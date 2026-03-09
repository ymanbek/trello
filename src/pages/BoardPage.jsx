import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import List from "../components/Board/List";
import AddList from "../components/Board/AddList";
import { reorderLists } from "../store/slices/listsSlice";
import { moveCard } from "../store/slices/cardsSlice";
import Header from "../components/UI/Header";

const BoardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { lists } = useSelector((state) => state.lists);
  const { cards } = useSelector((state) => state.cards);

  const [activeId, setActiveId] = useState(null);

  const boardId = "main-board";
  const boardLists = lists[boardId] || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = boardLists.findIndex((list) => list.id === active.id);
      const newIndex = boardLists.findIndex((list) => list.id === over.id);

      const newLists = arrayMove(boardLists, oldIndex, newIndex);

      dispatch(
        reorderLists({
          boardId,
          lists: newLists,
        })
      );
    }
  };

  const handleCardDragEnd = (event, sourceListId) => {
    const { active, over } = event;

    if (!over) return;

    const destinationListId = over.data.current?.listId || sourceListId;

    dispatch(
      moveCard({
        fromListId: sourceListId,
        toListId: destinationListId,
        cardId: active.id,
      })
    );
  };

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    navigate("/login");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <PageContainer>
      <Header>
        <HeaderLeft>
          <Logo>Trello</Logo>
        </HeaderLeft>
        <UserMenu>
          <UserAvatar>{user?.name ? getInitials(user.name) : "U"}</UserAvatar>
          <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
        </UserMenu>
      </Header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={boardLists.map((list) => list.id)}
          strategy={horizontalListSortingStrategy}
        >
          <ListsContainer>
            {boardLists.map((list) => (
              <List
                key={list.id}
                list={list}
                boardId={boardId}
                cards={cards[list.id] || []}
                onCardDragEnd={handleCardDragEnd}
              />
            ))}
            <AddList boardId={boardId} />
          </ListsContainer>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
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
    </PageContainer>
  );
};

export default BoardPage;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #026aa7;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.span`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 3px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ListsContainer = styled.div`
  padding: 20px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  overflow-x: auto;
  min-height: calc(100vh - 64px);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`;
