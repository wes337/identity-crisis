import { useState } from "react";
import styled from "styled-components";
import styles from "../../constants/styles";
import useAvatars from "../../hooks/useAvatars";
import Button from "../Button";

function Avatars() {
  const { avatars } = useAvatars();
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const showAvatars = avatars?.length > 0;

  const selectPreviousAvatar = () => {
    setSelectedAvatar((currentSelectedAvatar) => {
      const previousAvatar = currentSelectedAvatar - 1;
      if (previousAvatar === -1) {
        return avatars.length - 1;
      }
      return previousAvatar;
    });
  };

  const selectNextAvatar = () => {
    setSelectedAvatar((currentSelectedAvatar) => {
      const nextAvatar = currentSelectedAvatar + 1;
      if (nextAvatar > avatars.length - 1) {
        return 0;
      }
      return nextAvatar;
    });
  };

  if (!showAvatars) {
    return null;
  }

  return (
    <AvatarWrapper>
      <Button type="link" onClick={selectPreviousAvatar}>
        &lt;&lt;
      </Button>
      <Avatar
        src={`data:image/png;base64, ${avatars[selectedAvatar]}`}
        alt=""
      />
      <Button type="link" onClick={selectNextAvatar}>
        &gt;&gt;
      </Button>
    </AvatarWrapper>
  );
}

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${styles.margin.sm};
  gap: ${styles.gap.sm};
`;

const Avatar = styled.img`
  height: 64px;
  width: 64px;
  object-fit: contain;
  border: 4px double ${styles.colors.white};
`;

export default Avatars;
