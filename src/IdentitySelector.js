import { useState } from "react";
import { identities } from "./constants";
import "./IdentitySelector.scss";

function IdentitySelector({
  selectedIdentity,
  setSelectedIdentity,
  setCustomIdentity,
}) {
  const [identityChosen, setIdentityChosen] = useState(false);
  const [identity, setIdentity] = useState(-1);
  const [customIdentityTemp, setCustomIdentityTemp] = useState("");

  const removePrefix = (string) => {
    // Remove 'a ', 'an ', and 'the '
    if (string.toLowerCase().startsWith("a ")) {
      return string.slice(2);
    }

    if (string.toLowerCase().startsWith("an ")) {
      return string.slice(3);
    }

    if (string.toLowerCase().startsWith("the ")) {
      return string.slice(4);
    }
  };

  const changeCustomIdentity = (event) => {
    setCustomIdentityTemp(event.target.value);
  };

  const updateIdentity = () => {
    setSelectedIdentity(identity);

    if (identity === "custom") {
      setCustomIdentity(removePrefix(customIdentityTemp));
    }

    setIdentityChosen(true);
  };

  const resetIdentity = () => {
    setIdentity(-1);
    setSelectedIdentity(-1);
    setCustomIdentityTemp("");
    setCustomIdentity("");
    setIdentityChosen(false);
  };

  if (identityChosen) {
    const identityName =
      identity === "custom" ? customIdentityTemp : identities[identity];

    return (
      <div className="identity-chosen">
        <div className="small-text italic-text">You chose...</div>
        <div className="big-text">{identityName}</div>
        <button
          className="change-identity-button"
          onClick={() => resetIdentity()}
        >
          Change identity
        </button>
      </div>
    );
  }

  return (
    <div className="identity-selector">
      <div className="identity-list">
        {identities.map((ident, index) => (
          <button
            key={ident}
            onClick={() => setIdentity(index)}
            className={identity === index ? "selected-identity" : ""}
          >
            {ident}
          </button>
        ))}
        <button
          className={identity === "custom" ? "selected-identity" : ""}
          onClick={() => setIdentity("custom")}
        >
          Custom
        </button>
        {identity === "custom" && (
          <>
            <div className="custom-identity-warning">
              <div className="custom-identity-warning-header">Danger!</div>
              <div>
                You chose a custom identity. You are in danger of thinking for
                yourself! Results may vary.
              </div>
            </div>
            <input
              className="custom-identity-input"
              type="text"
              minLength="4"
              onChange={changeCustomIdentity}
              placeholder="Type in your custom identity..."
            />
          </>
        )}
      </div>
      <button
        className="set-identity"
        onClick={updateIdentity}
        disabled={
          identity < 0 ||
          (identity === "custom" && customIdentityTemp.trim().length === 0)
        }
      >
        Set Identity
      </button>
    </div>
  );
}

export default IdentitySelector;
