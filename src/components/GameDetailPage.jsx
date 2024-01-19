import { useParams } from "react-router-dom";
import "../styles/GameDetailPage.css"
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getGameDetails, getGameScreenshots } from "../../lib/api";


function GameDetailPage(props) {
    const {id} = useParams();
    const [gameDetail, setGameDetail] = useState({});
    const [gameScreenshots, setGameScreenshots] = useState([]);

    useEffect(() => {
        async function fetchGameDetail() {
            const gamedetail = await getGameDetails(id);
            setGameDetail(gamedetail);
        }

        async function fetchGameScreenshots() {
            const screenshots = await getGameScreenshots(id);
            setGameScreenshots(screenshots);
        }

        fetchGameDetail();
        fetchGameScreenshots();

    }, [id]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };

    return (
        <div className="GameDetailPage">
            <div className="game-detail">
                <div className="game-title">
                    {gameDetail.name}
                </div>
                <div className="game-album">
                    <div className="album-slider-container">
                        <Slider {...settings}>
                            {<img className="detail-album-img" src={gameDetail.background_image} alt={gameDetail.name} />}
                            {gameScreenshots.map((screenshot) => {
                                return (
                                        <img className="album-img" src={screenshot.image} alt={gameDetail.name} key={gameDetail.id}/>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

GameDetailPage.propTypes = {
}

GameDetailPage.defaultProps = {
}

export default GameDetailPage;