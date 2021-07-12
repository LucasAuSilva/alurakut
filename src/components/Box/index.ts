
import styled from 'styled-components';

export const Box = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;

  padding: 16px;

  .title {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333333;
    margin-bottom: 20px;
  }

  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2FA;
  }

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

  button {
    border: 0;
    padding: 8px 12px;
    color: #ffffff;
    border-radius: 10000px;
    background-color: #6F92BB;
  }
`;
