import { useParams } from "react-router-dom";
import "../styles/GameDetailPage.css"
import PropTypes from 'prop-types'
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getGameDetails } from "../../lib/api";


function GameDetailPage(props) {
    const {id} = useParams();
    const [gameDetail, setGameDetail] = useState({});
    console.log(id);
    useEffect(() => {
        async function fetchGameDetail() {
            const gamedetail = await getGameDetails(id);
            setGameDetail(gamedetail);
        }

        fetchGameDetail();
    }, [id]);

    return (
        <div className="GameDetailPage">
            <div className="game-detail">
                <div className="game-title">
                    {gameDetail.name}
                </div>
                <div className="game-album">
                    <div className="album-slider-container">
                        <Slider>

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