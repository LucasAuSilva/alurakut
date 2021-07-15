
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { ProfileSideBar } from '../src/components/ProfileSideBar';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { useEffect, useRef, useState } from 'react';
import Relations from '../src/components/Relations';
import { getFollow, getFollowers } from '../src/service/apiGitHub';
import Input from '../src/components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import { getCommunities } from '../src/service/apiDatoCms';
import { post } from '../src/service/apiNext';
import { ICommunity, ICreateCommunity } from '../src/@types';

export interface IRelations {
  id: number
  title: string;
  img: string;
  link: string
}

interface IFormData {
  title: string;
  image: string;
}

export default function Home() {
  const user = 'LucasAuSilva';

  const [seguindo, setSeguindo] = useState<IRelations[]>([]);

  const formRef = useRef<FormHandles>(null)

  const [comunidades, setComunidades] = useState<IRelations[]>([]);

  const [seguidores, setSeguidores] = useState<IRelations[]>([]);

  useEffect(() => {
    getFollowers(user, setSeguidores);
    getFollow(user, setSeguindo);

    getCommunities(setComunidades);
  }, []);

  function handleSubmit(data: IFormData) {

    post<ICreateCommunity>('/api/createCommunities', {
      title: data.title,
      creatorSlug: user,
      imageUrl: data.image
    }).then((community: ICommunity) => {
      console.log(community);

      const comunidadesAtualizadas = [...comunidades, {
        id: community.id,
        title: community.title,
        img: community.imageUrl,
        link: `/communities/${community.id}`
      }];
      setComunidades(comunidadesAtualizadas);
    }).catch((error) => {
      console.error(error);
    });
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

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                type="text"
                name="title"
                label="Nome da Comunidade"
                placeholder="Nome da Comunidade"
                required
              />

              <Input
                type="url"
                name="image"
                label="Url da imagem de capa"
                placeholder="Url da imagem de capa"
                required
              />

              <button>
                Criar comunidade
              </button>
            </Form>
          </Box>
          <Box>

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
