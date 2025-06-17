export default function Key(props) {
  return (
    <button onClick={props.clickMethod}>{props.myLetter.toUpperCase()}</button>
  );
}
