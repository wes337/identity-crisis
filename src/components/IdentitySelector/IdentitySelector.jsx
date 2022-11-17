import { useState } from "react";
import styled from "styled-components";
import styles from "../../constants/styles";
import identities from "../../constants/identities";
import useIdentity from "../../hooks/useIdentity";
import useAvatars from "../../hooks/useAvatars";
import { removeStringPrefix } from "../../utils";
import Button from "../Button";
import Avatars from "../Avatars";

function IdentitySelector() {
  const { identity, setIdentity } = useIdentity();
  const [selectedIdentity, setSelectedIdentity] = useState("");
  const { setAvatars } = useAvatars();
  const [customIdentity, setCustomIdentity] = useState("");

  const updateIdentity = () => {
    const newIdentity =
      selectedIdentity === "custom"
        ? removeStringPrefix(customIdentity)
        : selectedIdentity;
    setIdentity(newIdentity);
  };

  const resetIdentity = () => {
    setIdentity("");
    setAvatars([]);
  };

  if (identity) {
    return (
      <IdentityChosen>
        <span>You chose...</span>
        <h2>{identity}</h2>
        <Avatars />
        <ChangeIdentityButton>
          <Button onClick={() => resetIdentity()}>Change identity</Button>
        </ChangeIdentityButton>
      </IdentityChosen>
    );
  }

  return (
    <IdentitySelectorWrapper>
      {selectedIdentity !== "custom" && (
        <IdentityList>
          {Object.keys(identities).map((i) => {
            const identity = identities[i];
            const getColors = () => {
              if (identity === "POC") {
                return {
                  color: styles.colors.lightBlue,
                  textColor: styles.colors.white,
                };
              }

              if (identity === "Dark web aficionado") {
                return {
                  color: styles.colors.purple,
                  textColor: styles.colors.white,
                };
              }

              if (identity === "Leftist") {
                return {
                  color: styles.colors.yellow,
                  textColor: styles.colors.black,
                };
              }

              return {
                color: styles.colors.red,
                textColor: styles.colors.white,
              };
            };

            const { color, textColor } = getColors();

            return (
              <IdentityButton
                key={identity}
                color={color}
                textColor={textColor}
                onClick={() => {
                  setIdentity(identity);
                }}
                selected={selectedIdentity === identity}
              >
                {identity}
              </IdentityButton>
            );
          })}
        </IdentityList>
      )}

      <CustomIdentity>
        {selectedIdentity !== "custom" && (
          <>
            <CustomIdentityHeader>
              <em>Or input your own...</em>
            </CustomIdentityHeader>
            <IdentityButton
              selected={selectedIdentity === "custom"}
              onClick={() => setSelectedIdentity("custom")}
            >
              Custom
            </IdentityButton>
          </>
        )}
        {selectedIdentity === "custom" && (
          <CustomIdentityWarningWrapper>
            <Button type="link" onClick={() => setSelectedIdentity("")}>
              Go back
            </Button>
            <CustomIdentityWarning>
              <h3>Danger!</h3>
              <p>
                You chose a custom identity. You are in danger of thinking for
                yourself! Results may vary.
              </p>
            </CustomIdentityWarning>
            <CustomIdentityLabel>
              Type in your custom identity:
            </CustomIdentityLabel>
            <CustomIdentityInput
              type="text"
              minLength="4"
              onChange={(event) => setCustomIdentity(event.target.value)}
              placeholder="Type in your custom identity..."
              value={customIdentity}
            />
            <SetIdentityButtonWrapper>
              <Button
                type="alt"
                onClick={updateIdentity}
                disabled={customIdentity.trim().length === 0}
              >
                Set Identity
              </Button>
            </SetIdentityButtonWrapper>
          </CustomIdentityWarningWrapper>
        )}
      </CustomIdentity>
    </IdentitySelectorWrapper>
  );
}

const IdentitySelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${styles.padding.xs};
`;

const IdentityList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  padding: ${styles.padding.sm} ${styles.padding.md};
  padding-bottom: 18px;
  background-color: ${styles.colors.gray};
  border: 2px solid ${styles.colors.black};
  box-shadow: ${styles.boxShadow};
`;

const IdentityButton = styled.button`
  color: ${({ selected }) =>
    selected ? styles.colors.white : styles.colors.black};
  background-color: ${({ selected }) =>
    selected ? styles.colors.lightBlue : styles.colors.gray};

  text-align: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: none;
  font-size: ${styles.fontSize.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  background: ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  box-shadow: 10px 10px 0 ${styles.colors.black};

  padding: ${styles.padding.xl};

  &:before {
    content: ">> ";
  }
  &:after {
    content: " <<";
  }

  &:hover,
  &:focus {
    background-color: ${styles.colors.white};
    color: ${styles.colors.darkGray};
  }
  &:active {
    transform: none;
  }
`;

const CustomIdentityHeader = styled.h3`
  text-align: center;
  margin: ${styles.margin.sm};
  color: ${styles.colors.white};
  margin-top: ${styles.margin.lg};
  font-size: 20px;
`;

const SetIdentityButtonWrapper = styled.div`
  & > button {
    width: 100%;
  }
`;

const CustomIdentityWarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${styles.gap.sm};
  margin-top: ${styles.margin.sm};

  padding: ${styles.padding.sm} ${styles.padding.md};
  padding-bottom: 18px;
  background-color: ${styles.colors.gray};
  border: 2px solid ${styles.colors.black};
  box-shadow: ${styles.boxShadow};
`;

const CustomIdentityWarning = styled.div`
  text-align: center;
  color: ${styles.colors.white};
  background-color: ${styles.colors.red};
  padding: ${styles.padding.sm} 0;
  border: 4px double ${styles.colors.gray};
  h3 {
    margin: ${styles.margin.xs} ${styles.margin.md};
    text-transform: uppercase;
    &:before {
      content: ">> ";
      color: ${styles.colors.yellow};
    }
    &:after {
      content: " <<";
      color: ${styles.colors.yellow};
    }
  }
  p {
    margin: ${styles.margin.xs} ${styles.margin.md};
  }
`;

const CustomIdentity = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomIdentityLabel = styled.label`
  text-align: center;
  color: ${styles.colors.black};
`;

const CustomIdentityInput = styled.input`
  font-size: ${styles.fontSize.sm};
  margin: 0;
`;

const IdentityChosen = styled.div`
  width: 100%;
  text-align: center;
  padding: ${styles.padding.lg} ${styles.padding.xl};
  margin: 0 ${styles.margin.xs};
  font-size: ${styles.fontSize.md};
  color: ${styles.colors.white};
  background-color: ${styles.colors.lightBlue};
  border: 4px double ${styles.colors.white};
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  box-shadow: 0 0 0 4px ${styles.colors.lightBlue};

  span {
    font-size: ${styles.fontSize.sm};
    font-style: italic;
  }

  h2 {
    font-size: ${styles.fontSize.lg};
    margin-bottom: ${styles.margin.md};
  }
`;

const ChangeIdentityButton = styled.div`
  button {
    margin-bottom: ${styles.margin.md};
  }
`;

export default IdentitySelector;
