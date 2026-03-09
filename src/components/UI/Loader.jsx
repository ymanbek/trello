import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = ({ type = "spinner", text, size }) => {
  return (
    <LoaderContainer>
      {type === "spinner" && <Spinner size={size} />}
      {type === "dots" && (
        <DotsContainer>
          <Dot size={size} delay="0s" />
          <Dot size={size} delay="0.2s" />
          <Dot size={size} delay="0.4s" />
        </DotsContainer>
      )}
      {text && <LoaderText>{text}</LoaderText>}
    </LoaderContainer>
  );
};

export default Loader;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: ${(props) => props.padding || "40px"};
`;

const Spinner = styled.div`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: ${(props) => props.size || "12px"};
  height: ${(props) => props.size || "12px"};
  background: #667eea;
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const LoaderText = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0;
`;
