
import styled from 'styled-components';

export const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;

  margin-left: auto;
  margin-right: auto;

  grid-gap: 10px;
  padding: 16px;

  .profileArea {
    display: none;
    @media(min-width: 860px) {
      display: block;
    }
  }

  @media(min-width: 860px) {
    max-width: 1100px;
    display: grid;
    grid-template-columns: 160px 1fr 312px;
    grid-template-areas:
      'profileArea welcomeArea communityArea';
  }
`;
