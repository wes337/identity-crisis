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
  const { avatars, setAvatars, loading, setLoading, error, setError } =
    useAvatars();
  const { setActiveSection } = useNavigation();

  useEffect(() => {
    if (!identity || loading || error || avatars?.length > 0) {
      return;
    }

    setLoading(true);
    getAvatar(identity).then((avatars) => {
      if (avatars.type === "error") {
        setError(true);
      } else {
        setAvatars(avatars);
      }
      setLoading(false);
    });
  }, [avatars, error, identity, loading, setAvatars, setError, setLoading]);

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
