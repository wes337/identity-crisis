import { useState, useMemo, useEffect, useCallback } from "react";
import IdentitySelector from "./IdentitySelector";
import Generators from "./Generators";
import { identities } from "./constants";
import { getDatingProfile, getManifesto } from "./openAI";
import "./App.css";
import Question from "./Question";

function App() {
  const [loading, setLoading] = useState(false);
  const [selectedIdentity, setSelectedIdentity] = useState(0);
  const [selectedGenerator, setSelectedGenerator] = useState(undefined);
  const [customIdentity, setCustomIdentity] = useState("");
  const [content, setContent] = useState({
    "dating-profile": "",
    manifesto: "",
    question: "",
    comment: "",
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
      comment: "",
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
  };

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
  }, [
    content,
    fetchDatingProfile,
    fetchManifesto,
    identity,
    selectedGenerator,
  ]);

  const renderLoader = () => {
    return <h4 className="loader">Thinking for you, please wait...</h4>;
  };

  const renderContent = () => {
    if (!identity || !selectedGenerator) {
      return null;
    }

    return (
      <div className="generated-content">
        {loading && renderLoader()}
        {!loading && content && (
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
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Identity Crisis</h1>
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
      {selectedGenerator && (
        <div className="generated-content-header">
          <h2>{selectedGenerator.label}</h2>
          {!["question", "comment"].includes(selectedGenerator.id) && (
            <button type="button" onClick={refresh} disabled={loading}>
              Refresh
            </button>
          )}
        </div>
      )}
      {renderContent()}
    </div>
  );
}

export default App;
