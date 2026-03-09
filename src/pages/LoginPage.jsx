import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginSuccess } from "../store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginSuccess({
        id: "1",
        name: "User",
        email,
      })
    );
    navigate("/board");
  };

  return (
    <Container>
      <Card>
        <Logo>Trello</Logo>
        <Title>Вход в Trello</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Укажите адрес электронной почты"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Продолжить</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #026aa7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.h1`
  color: #026aa7;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 20px 0;
`;

const Title = styled.h2`
  color: #333;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 24px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e4e8;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #026aa7;
  }
`;

const Button = styled.button`
  background: #026aa7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0079bf;
  }
`;
