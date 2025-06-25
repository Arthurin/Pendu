export default function Key(props) {
  const styles = {
    backgroundColor: props.letterColor,
  };
  function clickKey() {
    console.log("click");
    props.clickMethod(props.myLetter);
  }
  return (
    <button disabled={props.endGame} onClick={clickKey} style={styles}>
      {props.myLetter.toUpperCase()}
    </button>
  );
}
