import React, { useState } from 'react';

function Student({ name, marks }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Marks: {marks}</p>
    </div>
  );
}

function App() {
  const [marks, setMarks] = useState(85);
  return (
    <div>
      <Student name="John" marks={marks} />
      <button onClick={() => setMarks(marks + 5)}>Increase Marks</button>
    </div>
  );
}

export default App;