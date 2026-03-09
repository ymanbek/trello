import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { loginSuccess } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "Yman@gmail.com" && password === "Yman2005") {
      dispatch(
        loginSuccess({
          id: "1",
          name: "Admin User",
          email: email,
        })
      );
      navigate("/boards");
    } else {
      setError("Неверный email или пароль");
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>

        <LinksContainer>
          <StyledLink to="/forgot-password">Не удается войти?</StyledLink>
          <Divider> · </Divider>
          <StyledLink to="/register">Зарегистрировать аккаунт</StyledLink>
        </LinksContainer>

        <RegisterLink>
          <Link to="/register">Зарегистрировать аккаунт</Link>
        </RegisterLink>

        <div style={{ marginTop: "24px", fontSize: "12px", color: "#9AA5B1" }}>
          <StyledLink to="/privacy">Политика конфиденциальности</StyledLink>
          <Divider> · </Divider>
          <StyledLink to="/terms">Условия использования</StyledLink>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #026aa7, #0079bf);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
`;

const LoginCard = styled.div`
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
  letter-spacing: -0.5px;
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
  margin-bottom: 24px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e4e8;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #026aa7;
    background-color: #f7faff;
  }

  &::placeholder {
    color: #9aa5b1;
  }
`;

const Button = styled.button`
  background: #026aa7;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background: #0079bf;
  }
`;

const LinksContainer = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e1e4e8;
`;

const StyledLink = styled(Link)`
  color: #026aa7;
  text-decoration: none;
  font-size: 14px;
  display: inline-block;
  margin: 0 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  color: #9aa5b1;
  font-size: 12px;
`;

const RegisterLink = styled.div`
  margin: 16px 0 0 0;

  a {
    color: #026aa7;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e03c31;
  font-size: 12px;
  margin-top: 8px;
  text-align: left;
`;
