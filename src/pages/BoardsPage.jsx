import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/UI/Header";
import { setCurrentBoard } from "../store/slices/boardsSlice";

const BoardsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards } = useSelector((state) => state.boards);
  const { user } = useSelector((state) => state.auth);

  const handleBoardClick = (board) => {
    dispatch(setCurrentBoard(board));
    navigate(`/board/${board.id}`);
  };

  return (
    <PageContainer>
      <Header user={user} />
      <ContentContainer>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              bgColor={board.backgroundColor}
              onClick={() => handleBoardClick(board)}
            >
              <BoardTitle>{board.title}</BoardTitle>
              <StarIcon>☆</StarIcon>
            </BoardCard>
          ))}
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default BoardsPage;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f6f8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const BoardCard = styled.div`
  background: ${(props) => props.bgColor || "#026AA7"};
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  height: 100px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const BoardTitle = styled.h3`
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const StarIcon = styled.span`
  color: white;
  font-size: 18px;
  text-align: right;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
`;
