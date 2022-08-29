import { useState } from "react";
import styled from "styled-components";
import ReadMore from "../ReadMore";
import IdentitySelector from "../IdentitySelector";
import styles from "../../constants/styles";
import useIdentity from "../../hooks/useIdentity";
import Button from "../Button";
import Navigation from "../Navigation";
import useNavigation from "../../hooks/useNavigation";

function Header() {
  const { identity } = useIdentity();
  const { activeSection } = useNavigation();
  const [showReadMore, setShowReadMore] = useState(false);
  const show = !identity || !activeSection;

  return (
    <HeaderWrapper show={show}>
      <Title>Identity Crisis 2000™</Title>
      <Subtitle>
        Input your <span>identity</span>, then generate some content.
        <br />
        <em>
          What is this app? Click{" "}
          <Button type="link" onClick={() => setShowReadMore(true)}>
            here
          </Button>{" "}
          to read more.
        </em>
      </Subtitle>
      <Controls>
        <IdentitySelector />
        <Navigation />
      </Controls>
      {showReadMore && <ReadMore close={() => setShowReadMore(false)} />}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  width: 600px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  color: ${styles.colors.yellow};
  padding: ${styles.padding.lg};
  font-size: ${styles.fontSize.xxl};
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  text-align: center;
  padding: ${styles.padding.sm} ${styles.padding.md};
  font-size: ${styles.fontSize.md};
  color: ${styles.colors.white};
  border: 2px solid ${styles.colors.gray};
  margin-bottom: ${styles.margin.md};

  span {
    color: ${styles.colors.pink};
  }

  em {
    color: ${styles.colors.gray};
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${styles.gap.md};
  margin-bottom: ${styles.margin.xl};
`;

export default Header;
