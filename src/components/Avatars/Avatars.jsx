import { useState } from "react";
import styled from "styled-components";
import styles from "../../constants/styles";
import useAvatars from "../../hooks/useAvatars";

function Avatars() {
  const { avatars } = useAvatars();
  const [selectedAvatar, setSelectedAvatar] = useState(1);

  const showAvatars = avatars?.length > 0;

  if (!showAvatars) {
    return null;
  }

  return (
    <AvatarWrapper>
      {avatars.map((avatar, index) => {
        const isSelected = index === selectedAvatar;

        return (
          <Avatar
            key={avatar.id}
            isSelected={isSelected}
            onClick={() => setSelectedAvatar(index)}
          >
            <img src={avatar.generation.image_path} alt="" />
          </Avatar>
        );
      })}
    </AvatarWrapper>
  );
}

const AvatarWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  margin: ${styles.margin.sm};
  gap: ${styles.gap.sm};
`;

const Avatar = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${styles.gap.xs};
  background: none;
  border: none;
  cursor: pointer;

  img {
    height: 48px;
    width: 48px;
    object-fit: contain;
    border: 4px double ${styles.colors.white};
    filter: grayscale(0.75);

    ${({ isSelected }) =>
      isSelected &&
      `
        height: 64px;
        width: 64px;
        filter: none;
      `}
  }

  ${({ isSelected }) =>
    isSelected &&
    `
      color: ${styles.colors.yellow};
      
      &:before {
        content: '>>';
      }

      &:after {
        content: '<<'
      }
  `}
`;

export default Avatars;
