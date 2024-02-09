import { useState } from "react";
import "./App.css";

const cardData = [{id: 0, selected: false}, {id: 1, selected: false}, {id: 2, selected: false}];

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex--);
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

function Cards({handler}) {
  shuffle(cardData);
  return(cardData.map((value, index) => <p key={value.id} className="card-p" onClick={() =>  handler(value.selected, index)}>{value.id} {value.selected}</p>))
}

function App() {
  const [score, setScore] = useState(0);

  function handleScore(previouslySelected, index) {
    if (previouslySelected === false) {
      cardData[index].selected = true;
      setScore(score + 1);
      console.log('here!');
    }
    else if (previouslySelected === true) {
      cardData.forEach(value => value.selected = false);
      setScore(0);
    }
  }

  return (
    <>
      <Cards handler={handleScore} />
      Hello
      Score: {score}
      cardData: {JSON.stringify(cardData)}
    </>
  );
}

export default App;