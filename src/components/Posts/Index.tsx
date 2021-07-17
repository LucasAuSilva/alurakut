import { IPosts } from "../../@types";

interface IPostProps {
  items: IPosts[]
}

const Posts = ({ items }: IPostProps) => {

  return (
    <ul>
      {items.map((post) => {
        return (
          <li key={post.id}>
            <img src={post.iconUser} alt={`Ícone do ${post.author}`} />
            <p>{post.text}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default Posts;
