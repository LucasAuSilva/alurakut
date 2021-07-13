
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
import { Box } from "../Box";

interface IProfileSideBarProps {
  githubUser: string
}

export const ProfileSideBar = ({ githubUser }: IProfileSideBarProps): JSX.Element => {

  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        alt="Imagem de perfil"
        style={{ borderRadius: `8px`}}
      />
      <hr/>

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}
