import { useState } from "react";
import styled from "styled-components";
import styles from "../../constants/styles";
import identities from "../../constants/identities";
import useIdentity from "../../hooks/useIdentity";
import { removeStringPrefix } from "../../utils";
import Button from "../Button";

function IdentitySelector() {
  const { identity, setIdentity } = useIdentity();
  const [selectedIdentity, setSelectedIdentity] = useState("");
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
  };

  if (identity) {
    return (
      <IdentityChosen>
        <span>You chose...</span>
        <h2>{identity}</h2>
        <Button onClick={() => resetIdentity()}>Change identity</Button>
      </IdentityChosen>
    );
  }

  return (
    <IdentitySelectorWrapper>
      <IdentityList>
        {Object.keys(identities).map((i) => {
          const identity = identities[i];
          return (
            <IdentityListItem key={identity}>
              <IdentityButton
                key={identity}
                onClick={() => setSelectedIdentity(identity)}
                selected={selectedIdentity === identity}
              >
                {identity}
              </IdentityButton>
            </IdentityListItem>
          );
        })}
        <IdentityListItem>
          <IdentityButton
            selected={selectedIdentity === "custom"}
            onClick={() => setSelectedIdentity("custom")}
          >
            Custom
          </IdentityButton>
        </IdentityListItem>
        {selectedIdentity === "custom" && (
          <CustomIdentityWarningWrapper>
            <CustomIdentityWarning>
              <h3>Danger!</h3>
              <p>
                You chose a custom identity. You are in danger of thinking for
                yourself! Results may vary.
              </p>
            </CustomIdentityWarning>
            <CustomIdentityInput
              type="text"
              minLength="4"
              onChange={(event) => setCustomIdentity(event.target.value)}
              placeholder="Type in your custom identity..."
            />
          </CustomIdentityWarningWrapper>
        )}
      </IdentityList>
      <SetIdentityButtonWrapper>
        <Button
          type="alt"
          onClick={updateIdentity}
          disabled={
            !selectedIdentity ||
            (selectedIdentity === "custom" &&
              customIdentity.trim().length === 0)
          }
        >
          Set Identity
        </Button>
      </SetIdentityButtonWrapper>
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
  padding: ${styles.padding.sm} ${styles.padding.md};
  background-color: ${styles.colors.gray};
  border: 2px solid ${styles.colors.black};
  box-shadow: ${styles.boxShadow};
`;

const IdentityListItem = styled.li`
  display: flex;
`;

const IdentityButton = styled.button`
  color: ${({ selected }) =>
    selected ? styles.colors.white : styles.colors.black};
  background-color: ${({ selected }) =>
    selected ? styles.colors.lightBlue : styles.colors.gray};
  white-space: nowrap;
  display: block;
  margin: auto;
  width: 100%;
  cursor: pointer;
  border: none;
  font-size: ${styles.fontSize.sm};
  text-align: left;
  box-shadow: none;

  &:before {
    content: ">> ";
  }

  &:after {
    content: unset;
  }

  &:hover,
  &:focus {
    background-color: ${styles.colors.black};
    color: ${styles.colors.gray};
  }

  &:active {
    transform: none;
  }
`;

const CustomIdentityWarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${styles.gap.sm};
  margin-top: ${styles.margin.sm};
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

const CustomIdentityInput = styled.input`
  font-size: ${styles.fontSize.sm};
  margin: 0;
`;

const SetIdentityButtonWrapper = styled.div`
  margin-top: ${styles.margin.xl};

  & > button {
    width: 100%;
  }
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

  button {
    margin-bottom: ${styles.margin.md};
  }
`;

export default IdentitySelector;
