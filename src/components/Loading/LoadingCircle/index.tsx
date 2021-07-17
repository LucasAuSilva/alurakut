import styled, { keyframes } from "styled-components";

interface PropsStyledDiv {
  size: number;
}

const spin = keyframes`
  to {
    transform: rotate(0deg);
  }

  from {
    transform: rotate(360deg);
  }
`;

const StyledDiv = styled.div<PropsStyledDiv>`
  border: 8px solid #d2d2d2; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: ${spin} 2s linear infinite;

`;

const LoadingCircle = ({ size }: PropsStyledDiv ) => {

  return <StyledDiv size={size}></StyledDiv>
}

export default LoadingCircle;
