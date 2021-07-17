
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { ProfileSideBar } from '../src/components/ProfileSideBar';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import React, { useEffect, useRef, useState } from 'react';
import Relations from '../src/components/Relations';
import { getFollow, getFollowers, getUser } from '../src/service/apiGitHub';
import Input from '../src/components/Input';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import { getCommunities } from '../src/service/apiDatoCms';
import { get, post } from '../src/service/apiNext';
import { ICommunity, ICreateCommunity, ICreatePosts, IPosts, IPostsDato, ITokenInfos } from '../src/@types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import nookies from 'nookies';
import jsonwebtoken from 'jsonwebtoken';
import { getAlurakut } from '../src/service/apiAlurakut';
import Posts from '../src/components/Posts/Index';
import LoadingDots from '../src/components/Loading/LoadingDots';

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

export default function Home({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [ postsLoading, setPostsLoading ] = useState(true);
  const [ postsLoadingCreate, setPostsLoadingCreate ] = useState(false);

  const [comunidades, setComunidades] = useState<IRelations[]>([]);
  const [seguidores, setSeguidores] = useState<IRelations[]>([]);
  const [seguindo, setSeguindo] = useState<IRelations[]>([]);
  const [posts, setPosts] = useState<IPosts[]>([]);

  const formRef = useRef<FormHandles>(null)

  useEffect(() => {
    getFollowers(user, setSeguidores);
    getFollow(user, setSeguindo);

    getCommunities(setComunidades);

    get('/posts').then((data: IPostsDato[]) => {
      const datoPosts: IPosts[] = data.map(({ id, author, text }) => {
         return {
          id,
          author,
          text,
          iconUser: `https://github.com/${author}.png`
        }
      })

      setPosts([...posts, ...datoPosts]);
      setPostsLoading(false);
    })
  }, [user]);

  function handleSubmitCommunity(data: IFormDataCommunity) {

    post<ICreateCommunity>('/communities', {
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

  async function handleSubmitPost(data: IFormDataPost) {

    setPostsLoadingCreate(true);
    post<ICreatePosts>('/posts', {
      author: data.username,
      text: data.text
    }).then((values: IPostsDato) => {

      const postsAtualizados: IPosts[] = [...posts, {
        id: values.id,
        author: values.author,
        iconUser: `https://github.com/${values.author}.png`,
        text: values.text
      }]

      setPosts(postsAtualizados);
      setPostsLoadingCreate(false);
    })
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
                { postsLoadingCreate ? <LoadingDots size={20}/> : 'Criar Post' }
              </button>

            </Form>
          </Box>
          <Box>
            <h2 className="subTitle">Posts da galera ({posts.length})</h2>

            <Posts isLoading={postsLoading} linkSeeAll="/posts" items={posts} />

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

  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

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
