import "../styles/Card.css"
import PropType from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXbox, faPlaystation, faSteam, faApple, faAndroid, faLinux } from '@fortawesome/free-brands-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons'; // Import from free-solid-svg-icons
import { useRef, useState } from "react";
import { defaultGameObject } from "../../lib/api";
import { useNavigate } from "react-router-dom";

function Card(props) {
    const platformIcons = {
        'PlayStation 5': faPlaystation,
        'PlayStation 4': faPlaystation,
        'PlayStation 3': faPlaystation,
        'Xbox Series S/X': faXbox,
        'Xbox One': faXbox, 
        'Xbox 360': faXbox,
        'PC': faSteam,
        'macOS': faApple,
        'Linux': faLinux,
        'Android': faAndroid,
        'iOS': faApple, // iOS does not have a specific FontAwesome icon, using faApple
        'Nintendo Switch': faGamepad, // Assuming you use faGamepad for Nintendo Switch
        // ... add other platforms as necessary
    };

    // process the game object
    const processedGameObject = processGameObject(props.gameObject);

    let uniquePlatforms = processedGameObject.platList.map((platform) => platformIcons[platform] || faGamepad);
    uniquePlatforms = [...new Set(uniquePlatforms)];
  
    const tagRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    let navigate = useNavigate();

    const handleClick = () => {
        navigate(`/game/${props.gameObject.id}`);
      };

    const handleMouseDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
        setPosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleMouseMove = (e) => {
        e.stopPropagation();
        if (isDragging){
            const element = tagRef.current;
            const deltaX = e.clientX - position.x;
            const deltaY = e.clientY - position.y;
            element.scrollLeft -= 0.07 * deltaX;
            element.scrollTop -= 0.07 * deltaY;
        }
    };

    const handleMouseUp = (e) => {
        e.stopPropagation();
        setIsDragging(false);
    }

    return <div className="item-card" onClick={handleClick}>
            <img className="item-img" src={processedGameObject["imgSrc"]}></img>
            <div className="item-body">
                <div className="item-title">
                    {processedGameObject["title"]}
                </div>
                <div className="item-plat">
                {uniquePlatforms.map((icon, index) => {
                    return <FontAwesomeIcon key={`platform-icon-${index}`} icon={icon} className="platform-icon" />;
                })}

                </div>
                <div
                    className="tags"
                    ref={tagRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseUp}
                    onClick={(e)=>{e.stopPropagation()}}>
                        {processedGameObject["tagList"]
                        .filter(tag => tag['language'] === 'eng')
                        .map(
                            (tag) => 
                                (<span className="item-tag" key={tag['name']}>{tag['name']}</span>)
                            
                        )}

                </div>
                <div className="item-price">*{props["price"]}</div>
            </div>
            
        </div>
}

function processGameObject(gameObject) {
    const { id, name, background_image, platforms, genres, tags, price } = gameObject;
    const tagList = tags.map((tag) => tag.name);
    const platList = platforms.map((platform) => platform.platform.name);
    const processedGameObject = {
        id,
        title: name,
        imgSrc: background_image,
        platList,
        tagList,
        price,
    };

    return processedGameObject;
}

Card.propTypes = {
    gameObject: PropType.object,
    onClick: PropType.func,
    price: PropType.number,
};

Card.defaultProps = {
    gameObject: defaultGameObject,
    onClick: () => {
        console.log("Clicked");
    },
    price: 9.99

};



export default Card;