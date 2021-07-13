
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { ProfileSideBar } from '../src/components/ProfileSideBar';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { FormEvent, useState } from 'react';
import Relations from '../src/components/Relations';

interface IComunidades {
  id: number
  title: string;
  img: string;
  link: string
}

export default function Home() {
  const user = 'LucasAuSilva';
  const link = '/users/'
  const pessoasFavoritas = [
    {
      id: 1,
      title: 'Guillescas',
      link: link.concat('Guillescas')
    },
    {
      id: 2,
      title: 'peas',
      link: link.concat('peas')
    },
    {
      id: 3,
      title: 'omariosouto',
      link: link.concat('omariosouto')
    },
    {
      id: 4,
      title: 'rafaballerini',
      link: link.concat('rafaballerini')
    },
    {
      id: 5,
      title: 'benawad',
      link: link.concat('benawad')
    },
    {
      id: 6,
      title: 'felipefialho',
      link: link.concat('felipefialho')
    }
  ]

  const [comunidades, setComunidades] = useState<IComunidades[]>([{
    id: 123123,
    title: 'Eu odeio acordar cedo',
    img: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    link: `/communities/${123123}`
  }]);

  function handleCreateCommunity(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);

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

              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para colocarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para colocarmos de capa"
                  required
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="communityArea" style={{ gridArea: 'communityArea' }}>
          <Relations
            title="Pessoas Favoritas"
            items={pessoasFavoritas}
            linkSeeAll="/users"
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
