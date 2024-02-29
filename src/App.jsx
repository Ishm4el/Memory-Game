import { useState, useEffect } from "react";
import "./App.css";

const cardData = [
  { id: 1, selected: false },
  { id: 2, selected: false },
  { id: 3, selected: false },
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex--);
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

function Cards({ handler }) {
  shuffle(cardData);

  useEffect(() => {
    Promise.all(
      cardData.map((value) =>
        fetch(`https://pokeapi.co/api/v2/pokemon-form/${value.id}/`).then(
          (response) => response.json()
        )
      )
    )
      .then((responses) => {
        const responseData = responses.map(
          (response) => response.sprites.front_default
        );
        console.log("Fetched data:", responseData);
        cardData.forEach((entry, index) => (entry.image = responseData[index]));
        console.log(cardData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  });

  return cardData.map((value, index) => (
    <p
      key={value.id}
      className="card-p"
      onClick={() => handler(value.selected, index)}
    >
      {value.id} {value.selected}
    </p>
  ));
}

function App() {
  const [score, setScore] = useState(0);

  function handleScore(previouslySelected, index) {
    if (previouslySelected === false) {
      cardData[index].selected = true;
      setScore(score + 1);
      console.log("here!");
    } else if (previouslySelected === true) {
      cardData.forEach((value) => (value.selected = false));
      setScore(0);
    }
  }

  return (
    <>
      <Cards handler={handleScore} />
      Hello Score: {score}
      cardData: {JSON.stringify(cardData)}
    </>
  );
}

export default App;
