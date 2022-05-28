import { useState } from "react";
import ReadMore from "./ReadMore";

function Header() {
  const [showReadMore, setShowReadMore] = useState(false);

  return (
    <>
      <div className="header">
        <h1 className="yellow-text uppercase">Identity Crisis 2000™</h1>
        <p>
          Choose your <span>identity</span>, then generate some content.
          <br />
          <em>
            What is this app? Click{" "}
            <button className="link" onClick={() => setShowReadMore(true)}>
              here
            </button>{" "}
            to read more.
          </em>
        </p>
      </div>
      {showReadMore && <ReadMore setShowReadMore={setShowReadMore} />}
    </>
  );
}

export default Header;
