import styled, { keyframes } from "styled-components";

interface IStyledDivProps {
  size: number;
}

const up = keyframes`
  from {
    transform: translateY(-10px);
  }

  to {
    transform: translateY(0px);
  }
`;

const StyledDiv = styled.div<IStyledDivProps>`

  display: flex;
  font-size: ${props => props.size}px;
  justify-content: center;

  p:first-child {
    display: initial;
    animation: ${up} 1s alternate-reverse infinite;
    animation-delay: 0.5s;
  }

  p:nth-child(2n) {
    display: initial;
    animation: ${up} 1s alternate-reverse infinite;
    animation-delay: 1s;
  }

  p:last-child {
    display: initial;
    animation: ${up} 1s alternate-reverse infinite;
    animation-delay: 1.5s;
  }
`;

const LoadingDots = ({ size }:IStyledDivProps) => {
  return (
    <StyledDiv size={size}>
      <p>.</p>
      <p>.</p>
      <p>.</p>
    </StyledDiv>
  )
}

export default LoadingDots;
