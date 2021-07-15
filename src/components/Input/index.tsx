import { InputHTMLAttributes } from "react";
import styled from "styled-components";


const StyledDiv = styled.div`

  position: relative;

  input {
    width: 100%;
    background-color: #F4F4F4;
    color: #333333;
    border: 0;
    padding: 18px 16px;
    margin-bottom: 14px;
    border-radius: 10px;

    ::placeholder {
      font-size: medium;
      color: #333333;
      opacity: 0;
      visibility: none;
    }

    :focus + label,
    :not(:placeholder-shown) + label{
      font-size: small;
      top: 1px;
      left: 16px;

      transition: all .25s;
    }
  }

  label {
    position: absolute;
    box-sizing: border-box;

    left: 17px;
    top: 16px;

    font-size: medium;

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
      <input {...rest} />
      <label htmlFor={name}>{label}</label>
    </StyledDiv>
  )
}

export default Input;
