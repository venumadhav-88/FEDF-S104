function App() {
  return (
    <div>
      <student name="John" />
      <student name="Doe" />
      <student name="Smith" />
    </div>
  );
}

function student(props) {
  return <h2>hello, {props.name}! </h2>
}

export default App;