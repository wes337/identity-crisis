function ReadMore({ setShowReadMore }) {
  return (
    <div className="content-wrapper">
      <div className="generated-content-header">
        <h2>What is this?</h2>
        <div className="generated-content-header-buttons">
          <button type="button" onClick={() => setShowReadMore(false)}>
            Back
          </button>
        </div>
      </div>
      <div className="generated-content">
        <p>
          The hard work of your life is no longer work. You eat food from a
          frozen yogurt tube. It's green, it's got nutrients, it's based on
          insects. But you dont mind because it's flavored with splenda,
          aspartame, and stevia. And it's actually good for you. Your job is
          completely taken over by a computer. There are self-driving cars and
          machines that masturbate for you.
        </p>
        <p>
          The last thing you need help with is your identity. Your personality.
          Your opinion. Your forum posts. Your dating profile. What do you say
          on your dating profile to let your mate know that you are
          compassionate, that you care about other people, that you're a good
          person, and that you have the right beliefs?
        </p>
      </div>
    </div>
  );
}

export default ReadMore;
