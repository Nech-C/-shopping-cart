import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/Card.jsx'
import GameDetail from './components/GameDetail.jsx';
function App() {
  const [gameList, setGameList] = useState([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);



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
    <div className='home'>
      {gameList.map((response) => {
        const game = response; 
         
        return (
          <Card
            key={game.id}
            title={game["name"]}
            imgSrc={game.background_image}
            platList={game.platforms.map((platform) => 
              platform.platform.name
            )}
            onClick={() => handleCardClick(game.id)}
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

// Function marked as async to use await inside
async function getGames() {
  try {
    let url = new URL("https://api.rawg.io/api/games");

    // Setup the parameters
    let params = {
      key: '47e36d6273bc45acad4e17f724d8eaf7', // Replace with your actual API key
      page_size: '15'      // Number of results to return per page
    };

    // Append parameters to the URL
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // Await the fetch call to resolve, getting the Response object
    let response = await fetch(url);

    // Await the parsing of the Response body as JSON
    let data = await response.json();

    // The data variable now holds the parsed JSON object
    console.log(data);

    // If you need to use the data outside, you can return it
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
  }
}

// Call the function
getGames();


export default App
