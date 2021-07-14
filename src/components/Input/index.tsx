import { InputHTMLAttributes } from "react";
import styled from "styled-components";


const StyledDiv = styled.div`

  position: relative;

  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 10000px;

    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }

  label {
    display: none;
    position: absolute;
    box-sizing: border-box;

    left: 17px;
    top: 14px;

    font-size: small;

    color: #333333;
    opacity: 1;

    transition: all .25s;
  }
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input = ({ name, label, ...rest }: InputProps): JSX.Element => {

  return (
    <StyledDiv>
      <label htmlFor={name}>{label}</label>
      <input name={name} {...rest} />
    </StyledDiv>
  )
}

export default Input;
