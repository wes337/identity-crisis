import styled from "styled-components";
import contentTypes from "../../constants/contentTypes";
import styles from "../../constants/styles";
import useLoading from "../../hooks/useLoading";
import useContent from "../../hooks/useContent";
import useIdentity from "../../hooks/useIdentity";
import useNavigation from "../../hooks/useNavigation";
import Loader from "../Loader";
import Question from "../Question";
import Opinion from "../Opinion";
import Button from "../Button";

function Content({ refresh }) {
  const { loading } = useLoading();
  const { identity } = useIdentity();
  const { content } = useContent();
  const { activeSection, setActiveSection } = useNavigation();

  const contentText = content?.[activeSection];
  const sectionLabel = contentTypes[activeSection].label;

  return (
    <ContentWrapper>
      <ContentHeader>
        <h1>{identity}</h1>
        <h2>{sectionLabel}</h2>
        <ContentHeaderButtons>
          {![contentTypes.question.id, contentTypes.opinion.id].includes(
            activeSection
          ) && (
            <Button onClick={refresh} disabled={loading}>
              Refresh
            </Button>
          )}
          <Button onClick={() => setActiveSection("")}>Back</Button>
        </ContentHeaderButtons>
      </ContentHeader>
      <ContentBody>
        {loading && <Loader />}
        {!loading && contentText && <ContentText>{contentText}</ContentText>}
        {activeSection === contentTypes.question.id && <Question />}
        {activeSection === contentTypes.opinion.id && <Opinion />}
      </ContentBody>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  position: absolute;
  background-color: ${styles.colors.blue};
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  overflow: auto;

  @media only screen and (min-width: 1000px) {
    padding: 0 ${styles.padding.lg};
  }
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${styles.gap.md};
  text-align: center;
  padding: ${styles.padding.lg};
  margin: ${styles.margin.md} ${styles.margin.sm};
  font-size: ${styles.fontSize.md};
  line-height: ${styles.fontSize.md};
  color: ${styles.colors.white};
  background-color: ${styles.colors.lightBlue};
  border: 4px double ${styles.colors.white};
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  box-shadow: 0 0 0 4px ${styles.colors.lightBlue};

  h1 {
    font-size: ${styles.fontSize.lg};
    font-weight: 300;
  }

  h2 {
    margin: 0;
    text-transform: uppercase;
    color: ${styles.colors.black};
    font-size: ${styles.fontSize.md};
  }
`;

const ContentHeaderButtons = styled.div`
  display: flex;
`;

const ContentBody = styled.div`
  margin: ${styles.margin.md} ${styles.margin.sm};
  margin-bottom: ${styles.margin.xl};
  padding: ${styles.padding.md} ${styles.padding.lg};
  background-color: ${styles.colors.gray};
  border: ${styles.border};
  box-shadow: ${styles.boxShadow};
`;

const ContentText = styled.p`
  font-size: ${styles.fontSize.md};
  margin: ${styles.margin.md};
  color: ${styles.colors.black};
`;

export default Content;
