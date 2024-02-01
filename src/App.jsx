import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <Card>1</Card>
    </>
  );
}

function Card(id) {
  return <div>Number: {id}</div>;
}

export default App;
