import "../styles/Home.css";
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useState } from "react";
import { getNewReleases, getRecommendedGames, shuffleArray } from "../../lib/api";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

function Home(props) {
    const [newReleaseList, setReleaseList] = useState([]);
    const [recommList, setRecommList] = useState([]);

    useEffect(() => {
        async function fetchGames() {
            const games = await getNewReleases()    ;
            setReleaseList(games);
        }

        async function fetchRecomm() {
            const games = await getRecommendedGames();
            setRecommList(games);
        }
        fetchRecomm();
        fetchGames();
    }, []);

    let navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/game/${id}`);
    }

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
        <div className="home-page">
            <h2 className="new-release-heading section-heading">NEW RELEASES</h2>
            <div className="new-releases">
                <div className="slider-container">
                    <Slider {...settings}>
                        {newReleaseList.length === 0? <>loading...</> : newReleaseList
                                                                    .sort((game1, game2) => game2.rating - game1.rating) // sort by rating
                                                                    .slice(0, 5)
                                                                    .map((game) => {
                            return (
                                <div className="new-game-card" key={game.id} onClick={() => handleClick(game.id)}>
                                    <img className="new-game-img" src={game.background_image} alt={game.name} />
                                    <h3 className="new-game-title">{game.name}</h3>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>

            <h2 className=" recomm-heading section-heading">RECOMMENDED</h2>
            <div className="recomm-games">
            {recommList.length === 0 ? <>loading...</> : shuffleArray(recommList)
                                                            .slice(0, 20)
                                                            .map(
                                                                (game) => 
                                                                    <div className="recomm-game-card" key={game.id}>
                                                                        <Card gameObject={game} />
                                                                    </div>
                                                            )
                }
            </div>
        </div>
    );
}


Home.propTypes = {

}

Home.defaultProps = {
    
}

export default Home;