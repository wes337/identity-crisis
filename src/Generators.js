import { generators } from "./constants";

function Generators({ selectedGenerator, setSelectedGenerator, identity }) {
  const changeGenerator = (event) => {
    const generator = generators.find(({ id }) => id === event.target.id);
    setSelectedGenerator(generator);
  };

  if (!identity) {
    return null;
  }

  return (
    <div className="generators">
      <h3 className="yellow-text uppercase">What do you need?</h3>
      <div className="generator-buttons">
        {generators.map(({ label, id }) => (
          <button
            className={selectedGenerator?.id === id ? "selected-generator" : ""}
            key={id}
            id={id}
            onClick={changeGenerator}
            disabled={!identity}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Generators;
