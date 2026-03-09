import React from "react";
import styled from "styled-components";

const Input = ({
  label,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  required,
  ...props
}) => {
  return (
    <InputContainer>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: "#ff6b6b" }}> *</span>}
        </Label>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${(props) => (props.error ? "#ff6b6b" : "#e1e1e1")};
  border-radius: 8px;
  background: ${(props) => (props.disabled ? "#f5f5f5" : "white")};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;
