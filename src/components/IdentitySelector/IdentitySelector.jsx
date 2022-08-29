import { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../../constants/styles";
import useIdentity from "../../hooks/useIdentity";
import { getSuggestion } from "../../api";
import { removeStringPrefix } from "../../utils";
import Button from "../Button";
import Avatars from "../Avatars";
import Loader from "../Loader";

function IdentitySelector() {
  const [loading, setLoading] = useState(false);
  const { identity, setIdentity } = useIdentity();
  const [customIdentity, setCustomIdentity] = useState("");

  useEffect(() => {
    setLoading(true);
    getSuggestion().then((suggestion) => {
      const newSuggestion = removeStringPrefix(suggestion).replace(".", "");
      setCustomIdentity(newSuggestion);
      setLoading(false);
    });
  }, []);

  const updateIdentity = () => {
    const newIdentity = removeStringPrefix(customIdentity);
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
        <Avatars />
        <ChangeIdentityButton>
          <Button onClick={() => resetIdentity()}>Change identity</Button>
        </ChangeIdentityButton>
      </IdentityChosen>
    );
  }

  return (
    <IdentitySelectorWrapper>
      <IdentityList>
        {loading ? (
          <Loader />
        ) : (
          <CustomIdentityWarningWrapper>
            <CustomIdentityLabel>
              Type in your custom identity:
            </CustomIdentityLabel>
            <CustomIdentityInput
              type="text"
              minLength="4"
              onChange={(event) => setCustomIdentity(event.target.value)}
              value={customIdentity}
            />
          </CustomIdentityWarningWrapper>
        )}
      </IdentityList>
      <SetIdentityButtonWrapper>
        <Button
          type="alt"
          onClick={updateIdentity}
          disabled={customIdentity.trim().length === 0}
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

const CustomIdentityWarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${styles.gap.sm};
  margin-top: ${styles.margin.sm};
`;

const CustomIdentityLabel = styled.label`
  text-align: center;
  color: ${styles.colors.black};
  text-transform: uppercase;
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
`;

const ChangeIdentityButton = styled.div`
  button {
    margin-bottom: ${styles.margin.md};
  }
`;

export default IdentitySelector;
