import { useCallback } from "react";
import debounce from "lodash.debounce";
import { identities } from "./constants";

function IdentitySelector({
  selectedIdentity,
  setSelectedIdentity,
  setCustomIdentity,
}) {
  const changeCustomIdentity = (event) => {
    setCustomIdentity(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeCustomIdentity = useCallback(
    debounce(changeCustomIdentity, 1000),
    []
  );

  return (
    <div className="identity-selector">
      <fieldset>
        <legend>Select your identity:</legend>
        {identities.map((identity, index) => (
          <div key={identity}>
            <input
              type="radio"
              id={identity}
              name={identity}
              value={identity}
              checked={selectedIdentity === index}
              onChange={() => setSelectedIdentity(index)}
            />
            <label htmlFor={identity}>{identity}</label>
          </div>
        ))}
        <div>
          <input
            type="radio"
            id="custom"
            name="custom"
            value="custom"
            checked={selectedIdentity === "custom"}
            onChange={() => setSelectedIdentity("custom")}
          />
          <label htmlFor="custom">
            <input
              disabled={selectedIdentity !== "custom"}
              type="text"
              id="custom-identity"
              name="custom-identity"
              minLength="4"
              onChange={debouncedChangeCustomIdentity}
            />
          </label>
        </div>
      </fieldset>
    </div>
  );
}

export default IdentitySelector;
