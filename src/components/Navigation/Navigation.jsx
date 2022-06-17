import { useEffect } from "react";
import styled from "styled-components";
import useNavigation from "../../hooks/useNavigation";
import useIdentity from "../../hooks/useIdentity";
import styles from "../../constants/styles";
import Button from "../Button";
import contentTypes from "../../constants/contentTypes";
import { getAvatar } from "../../api";
import useAvatars from "../../hooks/useAvatars";

const Navigation = () => {
  const { identity } = useIdentity();
  const { setAvatars, setLoading } = useAvatars();
  const { setActiveSection } = useNavigation();

  useEffect(() => {
    if (!identity) {
      return;
    }

    getAvatar(identity).then((avatars) => {
      setAvatars(avatars);
    });
  }, [identity, setAvatars, setLoading]);

  if (!identity) {
    return null;
  }

  return (
    <NavigationWrapper>
      <NavigationSubtitle>What do you need?</NavigationSubtitle>
      <NavigationButtons>
        {Object.keys(contentTypes).map((key) => {
          const { id, label } = contentTypes[key];
          return (
            <Button
              key={id}
              onClick={() => setActiveSection(id)}
              disabled={!identity}
            >
              {label}
            </Button>
          );
        })}
      </NavigationButtons>
    </NavigationWrapper>
  );
};

const NavigationWrapper = styled.div`
  text-align: center;
`;

const NavigationSubtitle = styled.h3`
  color: ${styles.colors.yellow};
  margin-bottom: ${styles.margin.sm};
  text-transform: uppercase;

  &:before {
    content: ">> ";
    color: ${styles.colors.white};
  }
  &:after {
    content: " <<";
    color: ${styles.colors.white};
  }
`;

const NavigationButtons = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${styles.gap.md};
`;

export default Navigation;
