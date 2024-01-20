import { useEffect, useState } from "react"
import "../styles/Overlay.css"
import PropType from 'prop-types'

function GameDetail(props) {
    const [gameDetail, setGameDetail] = useState({}); 

    useEffect(() => {
        async function fetchGameDetail() {
            const url = new URL('https://api.rawg.io/api/games/' + props.id);
            let params = {
                key: '47e36d6273bc45acad4e17f724d8eaf7',
            }

            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            let response = await fetch(url);
            let detail = await response.json();
            setGameDetail(detail);
            console.log(detail);
        }

        fetchGameDetail();
    }, [props.id]);

    return (
        <div className="overlay-detail">
            <img className="overlay-img" src={gameDetail.background_image}></img>
            <div className="overlay-body">
                <div className="overlay-game-title">
                    {gameDetail.name}
                </div>
                <div className="overlay-game-desc">
                    {gameDetail.description}
                </div>
                <div className="overlay-game-rating">
                    {gameDetail.rating}
                </div>
                {/* <div className="game-platforms">
                    {gameDetail.platforms.map(platform => (
                        <div key={platform.id} className="platform">
                            {platform.name}
                        </div>
                    ))}
                </div> */}
                <div className="overlay-game-released">
                    Released: {gameDetail.released}
                </div>
                <div className="overlay-game-website">
                    <a href={gameDetail.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                    </a>
                </div>
            </div>
            <button onClick={props.closeOverlay}>Close</button>
        </div>
    );

}

GameDetail.propTypes = {
    id: PropType.number,
    closeOverlay: PropType.func,
}

GameDetail.defaultProps = {
    id: 3494,
}

export default GameDetail;