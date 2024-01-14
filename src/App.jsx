import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/Card.jsx'
import GameDetail from './components/GameDetail.jsx';
import { Outlet } from 'react-router-dom';
import { getGames } from '../lib/api'

function TempHome() {
  const [gameList, setGameList] = useState([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [cart, setCart] = useState({}); // Format will be { gameId: quantity }

  const addToCart = (gameId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [gameId]: (prevCart[gameId] || 0) + 1,
    }));
  };

  const incrementQuantity = (gameId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [gameId]: prevCart[gameId] + 1,
    }));
  };

  const decrementQuantity = (gameId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [gameId]: Math.max(0, prevCart[gameId] - 1),
    }));
  };


  useEffect(() => {
    async function fetchGames() {
      const games = await getGames();
      setGameList(games["results"]);
    }

    fetchGames();
  }, []);

  const handleCardClick = (gameId) => {
    setSelectedGameId(gameId);
    setIsOverlayVisible(true);
  }

  return (
    <div className='app'>
      {gameList.map((response) => {
        const game = response; 
         
        return (
          <Card
            key={game.id}
            title={game["name"]}
            imgSrc={game.background_image}
            id={game.id}
            platList={game.platforms.map((platform) => 
              platform.platform.name
            )}
            onClick={() => handleCardClick(game.id)}
            addToCart={addToCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            quantity={cart[game.id] || 0}
          />
        );
      })}

      {isOverlayVisible && (
        <div className="overlay">
          <GameDetail id={selectedGameId} closeOverlay={() => setIsOverlayVisible(false)} />
        </div>)}
    </div>
  )
}


function App() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

// Function marked as async to use await inside


// Call the function
getGames();


export default App
