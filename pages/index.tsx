
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { ProfileSideBar } from '../src/components/ProfileSideBar';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import React, { useEffect, useRef, useState } from 'react';
import Relations from '../src/components/Relations';
import { getFollow, getFollowers } from '../src/service/apiGitHub';
import Input from '../src/components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import { getCommunities } from '../src/service/apiDatoCms';
import { post } from '../src/service/apiNext';
import { ICommunity, ICreateCommunity, IPosts, ITokenInfos } from '../src/@types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import nookies from 'nookies';
import jsonwebtoken from 'jsonwebtoken';
import { getAlurakut } from '../src/service/apiAlurakut';
import Posts from '../src/components/Posts/Index';

export interface IRelations {
  id: number
  title: string;
  img: string;
  link: string
}

interface IFormDataCommunity {
  title: string;
  image: string;
}

interface IFormDataPost {
  username: string;
  text: string;
}

interface ServerProps {
  nameUser: string;
}

export default function Home({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [seguindo, setSeguindo] = useState<IRelations[]>([]);

  const formRef = useRef<FormHandles>(null)

  const [posts, setPosts] = useState<IPosts[]>([
    {
      id: 341241234,
      author: 'peas',
      iconUser: 'https://github.com/peas.png',
      text: 'Testanto posts'
    },
  ])

  const [comunidades, setComunidades] = useState<IRelations[]>([]);

  const [seguidores, setSeguidores] = useState<IRelations[]>([]);

  useEffect(() => {
    getFollowers(user, setSeguidores);
    getFollow(user, setSeguindo);

    getCommunities(setComunidades);
  }, [user]);

  function handleSubmitCommunity(data: IFormDataCommunity) {

    post<ICreateCommunity>('/api/communities', {
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

  function handleSubmitPost(data: IFormDataPost) {
    console.log(data.username);
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

            <Form ref={formRef} onSubmit={handleSubmitCommunity}>
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
                placeholder="Url da image de capa"
                required
              />

              <button>
                Criar comunidade
              </button>
            </Form>
          </Box>
          <Box>
            <h2 className="subTitle">Coloque um comentário legal :)</h2>

            <Form onSubmit={handleSubmitPost}>

              <Input
                type="text"
                name="username"
                label="Seu nome no Github"
                placeholder="Seu nome no Github"
                required
              />

              <Input
                type="textarea"
                name="text"
                label="Escreva alguma coisa"
                placeholder="Escreva alguma coisa"
                required
              />

              <button>
                Criar Post
              </button>

            </Form>
          </Box>
          <Box>
            <h2 className="subTitle">Posts da galera</h2>

            <Posts items={posts} />

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

export const getServerSideProps: GetServerSideProps = async (context) => {

  const token = nookies.get(context).USER_TOKEN;

  const { isAuthenticated } = await getAlurakut('/auth', token);

  if (!isAuthenticated) {
    return {
      props: { error: 'Usuário não é válido' },
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const tokenInfos = jsonwebtoken.decode(token, {
    json: true,
    complete: true
  })

  const userLogin = tokenInfos?.payload as ITokenInfos;

  return {
    props: {
      user: userLogin.githubUser
    }
  }
};
