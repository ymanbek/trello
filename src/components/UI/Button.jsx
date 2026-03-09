import React from "react";
import styled, { keyframes } from "styled-components";

const Button = ({
  children,
  onClick,
  disabled,
  loading,
  variant = "primary",
  size = "medium",
  fullWidth,
  type = "button",
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      type={type}
      {...props}
    >
      {loading && <span className="spinner" />}
      {children}
    </StyledButton>
  );
};

export default Button;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledButton = styled.button`
  padding: ${(props) =>
    props.size === "small"
      ? "8px 16px"
      : props.size === "large"
      ? "14px 28px"
      : "12px 24px"};
  font-size: ${(props) =>
    props.size === "small" ? "14px" : props.size === "large" ? "18px" : "16px"};
  background: ${(props) => {
    if (props.variant === "secondary") return "#6c757d";
    if (props.variant === "success") return "#28a745";
    if (props.variant === "danger") return "#dc3545";
    if (props.variant === "warning") return "#ffc107";
    if (props.variant === "outline") return "transparent";
    return "#667eea";
  }};
  color: ${(props) => (props.variant === "outline" ? "#667eea" : "white")};
  border: ${(props) =>
    props.variant === "outline" ? "2px solid #667eea" : "none"};
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  font-weight: 600;
  transition: all 0.3s ease;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    background: ${(props) => {
      if (props.variant === "secondary") return "#5a6268";
      if (props.variant === "success") return "#218838";
      if (props.variant === "danger") return "#c82333";
      if (props.variant === "warning") return "#e0a800";
      if (props.variant === "outline") return "rgba(102, 126, 234, 0.1)";
      return "#5a67d8";
    }};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: ${spin} 0.8s linear infinite;
    margin-right: 8px;
  }
`;
