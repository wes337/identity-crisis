import { useMemo } from "react";
import styled from "styled-components";
import styles from "../../constants/styles";

function Button({ disabled, type, onClick, children }) {
  const Element = useMemo(() => {
    switch (type) {
      case "link":
        return UnstyledButton;
      case "alt":
        return AltButton;
      default:
        return StyledButton;
    }
  }, [type]);

  return (
    <Element disabled={disabled} onClick={onClick}>
      {children}
    </Element>
  );
}

const UnstyledButton = styled.button`
  background: transparent;
  padding: 0;
  margin: 0;
  color: ${styles.colors.yellow};
  box-shadow: none;

  &:before {
    content: "";
  }

  &:after {
    content: "";
  }

  &:hover,
  &:focus {
    color: ${styles.colors.yellow};
    background-color: ${styles.colors.darkYellow};
  }

  &:active {
    box-shadow: none;
    transform: none;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  color: ${styles.colors.black};
  background-color: ${styles.colors.gray};
  border: none;
  padding: ${styles.padding.md} ${styles.padding.lg};
  font-size: ${styles.fontSize.md};
  line-height: ${styles.fontSize.md};
  text-align: center;
  box-shadow: 10px 10px 0 ${styles.colors.black};
  white-space: normal;

  &:before {
    content: "< ";
  }

  &:after {
    content: " >";
  }

  &:hover,
  &:focus,
  &:disabled {
    color: ${styles.colors.white};
    text-decoration: none;
    background-color: ${styles.colors.darkGray};
  }

  &:active {
    box-shadow: none;
    transform: translate(4px, 4px);
  }
`;

const AltButton = styled.button`
  cursor: pointer;
  color: ${styles.colors.white};
  background-color: ${styles.colors.lightBlue};
  border: none;
  padding: ${styles.padding.md} ${styles.padding.lg};
  font-size: ${styles.fontSize.md};
  line-height: ${styles.fontSize.md};
  text-align: center;
  box-shadow: 10px 10px 0 ${styles.colors.black};
  white-space: normal;

  &:before {
    content: "< ";
  }

  &:after {
    content: " >";
  }

  &:hover,
  &:focus,
  &:disabled {
    color: ${styles.colors.white};
    text-decoration: none;
    background-color: ${styles.colors.darkGray};
  }

  &:active {
    box-shadow: none;
    transform: translate(4px, 4px);
  }
`;

export default Button;
