import styled from "styled-components";
import styles from "../../constants/styles";

function Loader() {
  return <LoadingText>Thinking for you, please wait...</LoadingText>;
}

const LoadingText = styled.h4`
  margin: ${styles.margin.md};
  color: ${styles.colors.yellow};
  font-size: ${styles.fontSize.md};
  text-transform: uppercase;
  text-align: center;
`;

export default Loader;
