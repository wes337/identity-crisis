import { useEffect, useCallback } from "react";
import styled from "styled-components";
import { getDatingProfile, getFreestyle, getManifesto } from "./api";
import Header from "./components/Header";
import Content from "./components/Content";
import useLoading from "./hooks/useLoading";
import useContent from "./hooks/useContent";
import useIdentity from "./hooks/useIdentity";
import styles from "./constants/styles";
import useNavigation from "./hooks/useNavigation";

function App() {
  const { loading, setLoading } = useLoading();
  const { identity } = useIdentity();
  const { activeSection } = useNavigation();
  const { content, clearContent, setContent } = useContent();

  const fetchDatingProfile = useCallback(() => {
    setLoading(true);
    getDatingProfile(identity).then((datingProfile) => {
      setContent("datingProfile", datingProfile);
      setLoading(false);
    });
  }, [identity, setContent, setLoading]);

  const fetchManifesto = useCallback(() => {
    setLoading(true);
    getManifesto(identity).then((manifesto) => {
      setContent("manifesto", manifesto);
      setLoading(false);
    });
  }, [identity, setContent, setLoading]);

  const fetchFreestyle = useCallback(() => {
    setLoading(true);
    getFreestyle(identity).then((freestyle) => {
      setContent("freestyle", freestyle);
      setLoading(false);
    });
  }, [identity, setContent, setLoading]);

  const refresh = () => {
    if (loading || !activeSection) {
      return;
    }

    if (activeSection === "datingProfile") {
      fetchDatingProfile();
    }

    if (activeSection === "manifesto") {
      fetchManifesto();
    }

    if (activeSection === "freestyle") {
      fetchFreestyle();
    }
  };

  useEffect(() => {
    if (identity) {
      clearContent();
    }
  }, [clearContent, identity]);

  useEffect(() => {
    if (!identity || !activeSection) {
      return;
    }

    if (activeSection === "datingProfile") {
      if (content.datingProfile) {
        return;
      }
      fetchDatingProfile();
    }

    if (activeSection === "manifesto") {
      if (content.manifesto) {
        return;
      }
      fetchManifesto();
    }

    if (activeSection === "freestyle") {
      if (content.freestyle) {
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
    activeSection,
  ]);

  return (
    <AppWrapper>
      <Header />
      {identity && activeSection && <Content refresh={refresh} />}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 ${styles.padding.md};
  }
`;

export default App;
