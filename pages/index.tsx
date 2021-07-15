
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { ProfileSideBar } from '../src/components/ProfileSideBar';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { FormEvent, useEffect, useState } from 'react';
import Relations from '../src/components/Relations';
import { getFollow, getFollowers } from '../src/service/apiGitHub';
import Input from '../src/components/Input';

export interface IRelations {
  id: number
  title: string;
  img: string;
  link: string
}

export default function Home() {
  const user = 'LucasAuSilva';

  const [seguindo, setSeguindo] = useState<IRelations[]>([]);

  const [comunidades, setComunidades] = useState<IRelations[]>([{
    id: 123123,
    title: 'Eu odeio acordar cedo',
    img: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    link: `/communities/${123123}`
  }]);

  const [seguidores, setSeguidores] = useState<IRelations[]>([]);

  useEffect(() => {
    getFollowers(user, setSeguidores);
    getFollow(user, setSeguindo);
  }, []);

  function handleCreateCommunity(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);

    console.log(dados);

    const title = dados.get('title') as string;
    const image = dados.get('image') as string;
    const id = new Date().getMilliseconds();

    if (title && image) {
      const comunidadesAtualizadas = [...comunidades, {
        id: id,
        title: title,
        img: image,
        link: `/communities/${id}`
      }];
      setComunidades(comunidadesAtualizadas);
    }
  }

  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) {user}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={handleCreateCommunity}>
              <Input
                type="text"
                name="title"
                label="Nome da Comunidade"
                placeholder="Nome da Comunidade"
                required
              />

              <Input
                type="text"
                name="image"
                label="Url da imagem de capa"
                placeholder="Url da imagem de capa"
                required
              />
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="communityArea" style={{ gridArea: 'communityArea' }}>
          <Relations
            title="Seguidores"
            items={seguidores}
            linkSeeAll=""
          />
          <Relations
            title="Seguindo"
            items={seguindo}
            linkSeeAll=""
          />
          <Relations
            title="Comunidade"
            items={comunidades}
            linkSeeAll="/communities"
          />
        </div>
      </MainGrid>
    </>
  );
}
