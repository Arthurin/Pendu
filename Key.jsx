export default function Key(props) {
  const styles = {
    backgroundColor: props.letterColor,
  };
  function clickKey() {
    props.clickMethod(props.myLetter);
  }
  return (
    <button
      disabled={props.endGame}
      aria-disabled={props.endGame}
      aria-label={`Letter ${props.myLetter}`}
      onClick={clickKey}
      style={styles}
    >
      {props.myLetter.toUpperCase()}
    </button>
  );
}
