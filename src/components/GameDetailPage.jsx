import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "../styles/GameDetailPage.css";
import { getGameDetails, getGameScreenshots } from "../../lib/api";

function GameDetailPage() {
    const { id } = useParams();
    const [gameDetail, setGameDetail] = useState({});
    const [gameScreenshots, setGameScreenshots] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const details = await getGameDetails(id);
                setGameDetail(details);
                const screenshots = await getGameScreenshots(id);
                setGameScreenshots(screenshots);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, [id]);

    const settings = {
        // ... existing settings
    };

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    const handleAddToCart = () => {
        // Implement add to cart logic
        console.log("Add to cart", gameDetail.id);
    };

    return (
        <div className="game-detail-page">
            <div className="game-detail-container">
                <div className="game-detail-header">
                    <h1 className="game-title">{gameDetail.name}</h1>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Add to Cart +
                    </button>
                </div>
                <div className="game-album">
                    <Slider {...settings}>
                        {gameDetail.background_image && (
                            <img className="detail-album-img" src={gameDetail.background_image} alt={gameDetail.name} />
                        )}
                        {gameScreenshots.map((screenshot) => (
                            <img className="album-img" src={screenshot.image} alt="Screenshot" key={screenshot.id} />
                        ))}
                    </Slider>
                </div>
                <div className="game-description">
                    <p>{gameDetail.description}</p>
                    <div className="game-meta">
                        <span>Released: {gameDetail.released}</span>
                        <span>Genres: {gameDetail.genres?.join(', ')}</span>
                        <span>Platforms: {gameDetail.platforms?.join(', ')}</span>
                        {/* ... other meta information */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetailPage;
