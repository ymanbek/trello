import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { registerStart, registerSuccess } from "../../store/slices/authSlice";
import { FiMail, FiLock, FiUser, FiUserPlus } from "react-icons/fi";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Атыңызды жазыңыз";
    } else if (formData.name.length < 2) {
      newErrors.name = "Атыңыз 2 символдон кем болбошу керек";
    }

    if (!formData.email) {
      newErrors.email = "Email дарегин жазыңыз";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Туура email дарегин жазыңыз";
    }

    if (!formData.password) {
      newErrors.password = "Сырсөздү жазыңыз";
    } else if (formData.password.length < 6) {
      newErrors.password = "Сырсөз 6 символдон кем болбошу керек";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Сырсөздү кайра жазыңыз";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Сырсөздөр дал келбейт";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(registerStart());

    setTimeout(() => {
      dispatch(
        registerSuccess({
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
        })
      );
      navigate("/boards");
    }, 1500);
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Logo>
          <h1>Trello</h1>
          <p>Катталуу</p>
        </Logo>

        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <FiUser />
            <Input
              type="text"
              name="name"
              placeholder="Атыңыз"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={loading}
            />
          </InputWrapper>

          <InputWrapper>
            <FiMail />
            <Input
              type="email"
              name="email"
              placeholder="Email дарегиңиз"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
            />
          </InputWrapper>

          <div>
            <InputWrapper>
              <FiLock />
              <Input
                type="password"
                name="password"
                placeholder="Сырсөз"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={loading}
              />
            </InputWrapper>
            {formData.password && (
              <PasswordStrength strength={passwordStrength}>
                <div />
              </PasswordStrength>
            )}
          </div>

          <InputWrapper>
            <FiLock />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Сырсөздү кайра жазыңыз"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={loading}
            />
          </InputWrapper>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" fullWidth size="large" loading={loading}>
            <FiUserPlus style={{ marginRight: "8px" }} />
            Катталуу
          </Button>
        </Form>

        <Footer>
          <p>Аккаунтуңуз барбы?</p>
          <Link to="/login">Кирүү</Link>
        </Footer>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  padding: 40px;
  animation: slideUp 0.5s ease;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 36px;
    color: #667eea;
    margin: 0;
    font-weight: 700;
  }

  p {
    color: #666;
    margin: 10px 0 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 20px;
  }

  input {
    padding-left: 45px;
  }
`;

const Footer = styled.div`
  margin-top: 30px;
  text-align: center;
  border-top: 1px solid #e1e1e1;
  padding-top: 20px;

  p {
    color: #666;
    margin: 0 0 10px;
  }

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #5a67d8;
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fff5f5;
  color: #ff6b6b;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  border: 1px solid #ff6b6b;
`;

const PasswordStrength = styled.div`
  margin-top: 5px;
  height: 4px;
  background: #e1e1e1;
  border-radius: 2px;
  overflow: hidden;

  div {
    height: 100%;
    width: ${(props) => props.strength}%;
    background: ${(props) => {
      if (props.strength < 30) return "#ff6b6b";
      if (props.strength < 60) return "#fbbf24";
      return "#10b981";
    }};
    transition: all 0.3s ease;
  }
`;
