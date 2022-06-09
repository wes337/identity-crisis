import styled from "styled-components";
import styles from "../../constants/styles";
import Button from "../Button";

const ReadMore = ({ close }) => {
  return (
    <ReadMoreWrapper>
      <ReadMoreHeader>
        <h2>What is this?</h2>
        <ReadMoreHeaderButtons>
          <Button onClick={close}>Back</Button>
        </ReadMoreHeaderButtons>
      </ReadMoreHeader>
      <ReadMoreBody className="generated-content">
        <ReadMoreText>
          The hard work of your life is no longer work. You eat food from a
          frozen yogurt tube. It's green, it's got nutrients, it's based on
          insects. But you dont mind because it's flavored with splenda,
          aspartame, and stevia. And it's actually good for you. Your job is
          completely taken over by a computer. There are self-driving cars and
          machines that masturbate for you.
        </ReadMoreText>
        <ReadMoreText>
          The last thing you need help with is your identity. Your personality.
          Your opinion. Your forum posts. Your dating profile. What do you say
          on your dating profile to let your mate know that you are
          compassionate, that you care about other people, that you're a good
          person, and that you have the right beliefs?
        </ReadMoreText>
      </ReadMoreBody>
    </ReadMoreWrapper>
  );
};

const ReadMoreWrapper = styled.div`
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

const ReadMoreHeader = styled.div`
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

  h2 {
    margin: 0;
    text-transform: uppercase;
    color: ${styles.colors.black};
    font-size: ${styles.fontSize.md};
  }
`;

const ReadMoreHeaderButtons = styled.div`
  display: flex;
`;

const ReadMoreBody = styled.div`
  margin: ${styles.margin.md} ${styles.margin.sm};
  margin-bottom: ${styles.margin.xl};
  padding: ${styles.padding.md} ${styles.padding.lg};
  background-color: ${styles.colors.gray};
  border: ${styles.border};
  box-shadow: ${styles.boxShadow};
`;

const ReadMoreText = styled.p`
  font-size: ${styles.fontSize.md};
  margin: ${styles.margin.md};
  color: ${styles.colors.black};
`;

export default ReadMore;
