
import { MainGrid } from '../src/components/MainGrid';
import { Box } from '../src/components/Box';
import { ProfileSideBar } from '../src/components/ProfileSideBar';

import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper';

export default function Home() {
  const user = 'LucasAuSilva';
  const pessoasFavoritas = [
    'Guillescas',
    'peas',
    'omariosouto',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

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
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="communityArea" style={{ gridArea: 'communityArea' }}>
          <Box>
            Comunidades
          </Box>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((pessoa) => {
                return (
                  <li key={pessoa}>
                    <a href={`/users/${pessoa}`}>
                      <img src={`https://github.com/${pessoa}.png`} alt="Imagem de Perfil"/>
                      <span>{pessoa}</span>
                    </a>
                  </li>
                  );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
