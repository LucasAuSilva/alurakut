
import styled from "styled-components";

export const StyledDivInput = styled.div`

position: relative;

margin-top: 5px;
margin-bottom: 10px;

input {
  width: 100%;
  background-color: #F4F4F4;
  color: #333333;
  border: 1px solid #33333357;
  padding: 18px 16px;
  margin-bottom: 14px;
  border-radius: 10px;

  ::placeholder {
    font-size: medium;
    color: #333333;
    opacity: 0;
    visibility: none;
    display: none;
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

span {
  color: red;
}
`;
