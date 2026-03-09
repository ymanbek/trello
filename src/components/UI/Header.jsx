import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../../store/slices/authSlice";

const Header = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getInitials = (name) => {
    return name;
  };

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Logo>Trello</Logo>
        <NavButton>Рабочие пространства</NavButton>
        <NavButton>Недавние</NavButton>
        <NavButton>В избранном</NavButton>
        <NavButton>Шаблоны</NavButton>
        <CreateButton>Создать</CreateButton>
      </HeaderLeft>

      <HeaderRight>
        <UserMenu>
          <UserAvatar>{user?.name ? getInitials(user.name) : "U"}</UserAvatar>
          <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
        </UserMenu>
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background: #026aa7;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  margin-right: 8px;
  letter-spacing: -0.5px;
`;

const NavButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CreateButton = styled.button`
  background: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #61bd4f;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
