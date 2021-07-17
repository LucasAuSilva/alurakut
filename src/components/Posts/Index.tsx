import styled from "styled-components";
import { IPosts } from "../../@types";
import LoadingCircle from "../Loading/LoadingCircle";

interface IPostProps {
  items: IPosts[];
  isLoading: boolean;
  linkSeeAll: string;
}

const StyledUlPost = styled.ul`

  li {
    display: flex;

    border-radius: 8px;
    border: 1px solid black;

    height: 60px;
    margin: 10px 0;

    background-color: #87c1ed;
  }

  img {
    height: 100%;
    border-radius: 8px;
    margin-right: 5px;
  }

  p {
    margin-top: 5px;
    font-size: small
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

const Posts = ({ items, linkSeeAll, isLoading }: IPostProps) => {

  return (
    <>
      <StyledUlPost>
        {items.map((post) => {
          if (items.length > 5) {
            return;
          }
          return (
            <li key={post.id}>
              <img src={post.iconUser} alt={`Ícone do ${post.author}`} />
              <div>
                <label>{post.author}</label>
                <p>{post.text.length > 150 ? post.text.substring(0, 156) + "..." : post.text}</p>
              </div>
            </li>
          )
        })}
      </StyledUlPost>
      {isLoading ? <LoadingCircle size={30} /> : null}
      <div style={ { display: items.length > 5 ? 'initial' : 'none'} }>
        <hr />
        <a className="boxLink" href={linkSeeAll}>Ver Todos</a>
      </div>
    </>
  )
}

export default Posts;
