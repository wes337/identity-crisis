import { useState, useMemo, useEffect, useCallback } from "react";
import init386 from "386-animation";
import IdentitySelector from "./IdentitySelector";
import Generators from "./Generators";
import { identities } from "./constants";
import { getDatingProfile, getFreestyle, getManifesto } from "./openAI";
import Header from "./Header";
import Question from "./Question";
import Opinion from "./Opinion";
import "386-animation/386.css";
import "./App.scss";

function App() {
  const [loading, setLoading] = useState(false);
  const [selectedIdentity, setSelectedIdentity] = useState(-1);
  const [selectedGenerator, setSelectedGenerator] = useState(undefined);
  const [customIdentity, setCustomIdentity] = useState("");
  const [content, setContent] = useState({
    "dating-profile": "",
    manifesto: "",
    question: "",
    opinion: "",
    freestyle: "",
  });

  const identity = useMemo(() => {
    if (selectedIdentity === "custom" && customIdentity) {
      return customIdentity;
    }

    return identities[selectedIdentity];
  }, [customIdentity, selectedIdentity]);

  const clearContent = () => {
    setContent({
      "dating-profile": "",
      manifesto: "",
      question: "",
      opinion: "",
      freestyle: "",
    });
  };

  const fetchDatingProfile = useCallback(() => {
    setLoading(true);
    getDatingProfile(identity).then((datingProfile) => {
      setContent((content) => {
        return {
          ...content,
          "dating-profile": datingProfile,
        };
      });
      setLoading(false);
    });
  }, [identity]);

  const fetchManifesto = useCallback(() => {
    setLoading(true);
    getManifesto(identity).then((manifesto) => {
      setContent((content) => {
        return {
          ...content,
          manifesto,
        };
      });
      setLoading(false);
    });
  }, [identity]);

  const fetchFreestyle = useCallback(() => {
    setLoading(true);
    getFreestyle(identity).then((freestyle) => {
      setContent((content) => {
        return {
          ...content,
          freestyle,
        };
      });
      setLoading(false);
    });
  }, [identity]);

  const refresh = () => {
    if (loading || !selectedGenerator) {
      return;
    }

    if (selectedGenerator?.id === "dating-profile") {
      fetchDatingProfile();
    }

    if (selectedGenerator?.id === "manifesto") {
      fetchManifesto();
    }

    if (selectedGenerator?.id === "freestyle") {
      fetchFreestyle();
    }
  };

  useEffect(() => {
    init386({
      speedFactor: 2.5,
    }); // https://github.com/wes337/386-animation
  }, []);

  useEffect(() => {
    if (identity) {
      clearContent();
    }
  }, [identity]);

  useEffect(() => {
    if (!identity || !selectedGenerator) {
      return;
    }

    if (selectedGenerator.id === "dating-profile") {
      if (content["dating-profile"]) {
        return;
      }
      fetchDatingProfile();
    }

    if (selectedGenerator.id === "manifesto") {
      if (content["manifesto"]) {
        return;
      }
      fetchManifesto();
    }

    if (selectedGenerator.id === "freestyle") {
      if (content["freestyle"]) {
        return;
      }
      fetchFreestyle();
    }
  }, [
    content,
    fetchDatingProfile,
    fetchFreestyle,
    fetchManifesto,
    identity,
    selectedGenerator,
  ]);

  const renderLoader = () => {
    return <h4 className="loader">Thinking for you, please wait...</h4>;
  };

  const renderContent = () => {
    return (
      <div className="generated-content">
        {loading && renderLoader()}
        {!loading && content && content[selectedGenerator.id] && (
          <p className="generated-content-text">
            {content[selectedGenerator.id]}
          </p>
        )}
        {selectedGenerator?.id === "question" && (
          <Question
            identity={identity}
            setContent={setContent}
            loading={loading}
            setLoading={setLoading}
          />
        )}
        {selectedGenerator?.id === "opinion" && (
          <Opinion
            identity={identity}
            setContent={setContent}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    );
  };

  return (
    <div className="app">
      <Header />
      <div className="controls">
        <IdentitySelector
          selectedIdentity={selectedIdentity}
          setSelectedIdentity={setSelectedIdentity}
          setCustomIdentity={setCustomIdentity}
        />
        <Generators
          selectedGenerator={selectedGenerator}
          setSelectedGenerator={setSelectedGenerator}
          identity={identity}
        />
      </div>
      {identity && selectedGenerator && (
        <div className="content-wrapper">
          <div className="generated-content-header">
            <h1>{identity}</h1>
            <h2>{selectedGenerator.label}</h2>
            <div className="generated-content-header-buttons">
              {!["question", "opinion"].includes(selectedGenerator.id) && (
                <button type="button" onClick={refresh} disabled={loading}>
                  Refresh
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedGenerator(undefined)}
              >
                Back
              </button>
            </div>
          </div>
          {renderContent()}
        </div>
      )}
    </div>
  );
}

export default App;
