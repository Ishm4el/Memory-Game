import { useState, useEffect } from "react";
import "./App.css";

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

function Cards({ handler, pokemons }) {
  return pokemons.map((pokemon, index) => (
    <div
      className="container-p"
      key={pokemon.id}
      onClick={() => handler(pokemon.selected, index)}
    >
      <img src={pokemon.image} alt="" draggable="false" />
      <p className="pokemon-name">{pokemon.name}</p>
    </div>
  ));
}

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchSprite = async () => {
      try {
        const cardData = [];
        while (cardData.length < 10) {
          const randomID = Math.floor(Math.random() * 100) + 1;
          if (!cardData.some((entry) => entry.id === randomID)) {
            cardData.push({ id: randomID, selected: false });
          }
        }

        const promiseImages = cardData.map(async (entry) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon-form/${entry.id}/`
          );
          return await response.json();
        });
        const fetchedData = await Promise.all(promiseImages);
        setPokemons(
          cardData.map((entry, index) => {
            const [name, image] = [
              fetchedData[index].name,
              fetchedData[index].sprites.front_default,
            ];
            entry.name = name;
            entry.image = image;
            return entry;
          })
        );
      } catch (error) {
        console.error("error fetching pokemon data", error);
      }
    };
    fetchSprite();
  }, []);

  function handleScore(previouslySelected, index) {
    if (previouslySelected === false) {
      pokemons[index].selected = true;
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      console.log("here!");
    } else if (previouslySelected === true) {
      pokemons.forEach((value) => (value.selected = false));
      setScore(0);
    }
  }

  shuffle(pokemons);

  return (
    <>
      <div id="header">
        <h1>Pokemon Memory Game</h1>
      </div>
      <div id="game-display">
        <Cards handler={handleScore} pokemons={pokemons} />
      </div>
      <div id="score-display">
        <p id="score">Score: {score}</p>
        <p id="high-score">High Score: {highScore}</p>
      </div>
    </>
  );
}

export default App;
