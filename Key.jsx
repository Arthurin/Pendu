export default function Key(props) {
  function clickKey() {
    console.log("click");
    props.clickMethod(props.myLetter);
  }
  return <button onClick={clickKey}>{props.myLetter.toUpperCase()}</button>;
}
