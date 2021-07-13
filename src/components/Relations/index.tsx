
import { ProfileRelationsBoxWrapper } from '../ProfileRelationsBoxWrapper';

interface IRelationsProps {
  title: string;
  items: {
    id: number;
    title: string
    img?: string;
    link: string;
  }[];
  linkSeeAll: string
}

const Relations = ({ title, items, linkSeeAll }: IRelationsProps): JSX.Element => {

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>
      <ul>
        {items.map((item, index) => {
          if ((index) >= 6) {
            return
          }
          return (
            <li key={item.id}>
              <a href={`/users/${item.title}`}>
                <img
                  src={item.img ? item.img : `https://github.com/${item.title}.png`}
                  alt="Imagem de Perfil"
                />
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <div style={ { display: items.length > 6 ? 'initial' : 'none'} }>
        <hr />
        <a className="boxLink" href={linkSeeAll}>Ver Todos</a>
      </div>
    </ProfileRelationsBoxWrapper>
  );
}

export default Relations;
