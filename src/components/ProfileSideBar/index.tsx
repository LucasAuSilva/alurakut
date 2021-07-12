
import { Box } from "../Box";

interface IProfileSideBarProps {
  githubUser: string
}

export const ProfileSideBar = ({ githubUser }: IProfileSideBarProps): JSX.Element => {

  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        alt="Imagem de perfil"
        style={{ borderRadius: `8px`}}
      />
    </Box>
  );
}
