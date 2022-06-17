import styled, { keyframes } from "styled-components";
import styles from "../../constants/styles";

function LoaderAnimation() {
  return (
    <LoaderAnimationWrapper>
      <LoaderAnimationFrames>
        <LoaderAnimationFrame>—</LoaderAnimationFrame>
        <LoaderAnimationFrame>\</LoaderAnimationFrame>
        <LoaderAnimationFrame>|</LoaderAnimationFrame>
        <LoaderAnimationFrame>/</LoaderAnimationFrame>
      </LoaderAnimationFrames>
    </LoaderAnimationWrapper>
  );
}

function Loader() {
  return (
    <LoaderWrapper>
      <LoaderAnimation />
      <LoadingText>Thinking for you, please wait...</LoadingText>
      <LoaderAnimation />
    </LoaderWrapper>
  );
}

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.h4`
  margin: ${styles.margin.md};
  color: ${styles.colors.yellow};
  font-size: ${styles.fontSize.md};
  text-transform: uppercase;
  text-align: center;
`;

const LoaderSpinAnimation = keyframes`
  100% {
    transform: translateX(-100%);
  }
`;

const LoaderAnimationWrapper = styled.div`
  color: ${styles.colors.yellow};
  font-size: ${styles.fontSize.md};
  overflow: hidden;
  height: 100%;
  margin: auto;
`;

const LoaderAnimationFrames = styled.div`
  display: flex;
  animation: ${LoaderSpinAnimation} 500ms infinite;
  animation-timing-function: steps(4);
  width: calc(4 * 100%);
`;

const LoaderAnimationFrame = styled.span`
  width: calc(100% / 4);
  max-width: calc(100% / 4);
  flex-basis: calc(100% / 4);
`;

export default Loader;
