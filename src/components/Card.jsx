import "../styles/Card.css"
import PropType from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXbox, faPlaystation, faSteam, faApple, faAndroid, faLinux } from '@fortawesome/free-brands-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons'; // Import from free-solid-svg-icons

// ... rest of your code

import { useRef, useState } from "react";


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
    let uniquePlatforms = props.platList.map((platform) => platformIcons[platform] || faGamepad);
    uniquePlatforms = [...new Set(uniquePlatforms)]; 
    const tagRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setPosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging){
            const element = tagRef.current;
            const deltaX = e.clientX - position.x;
            const deltaY = e.clientY - position.y;
            element.scrollLeft -= 0.07 * deltaX;
            element.scrollTop -= 0.07 * deltaY;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    return <div className="item-card" onClick={props.onClick}>
        <img className="item-img" src={props["imgSrc"]}></img>
        <div className="item-body">
            <div className="item-title">
                {props["title"]}
            </div>
            <div className="item-plat">
            {uniquePlatforms.map(platform => {
                return <FontAwesomeIcon key={platform} icon={platform} className="platform-icon" />;
            })}
        </div>
            <div
                className="tags"
                ref={tagRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}>
                    {props["tagList"].map(
                        (tag) => 
                            (<span className="item-tag" key={tag}>{tag}</span>)
                        
                    )}
            </div>
            <div className="item-price">{props["price"]}</div>
        </div>
    </div>
}



Card.propTypes = {
    imgSrc: PropType.string,
    title: PropType.string,
    price: PropType.number,
    tagList: PropType.array,
    platList: PropType.array,
    onClick: PropType.func,
}

Card.defaultProps = {
    imgSrc: "https://th.bing.com/th/id/R.3aec4259a605034d28aaf2fe46ad4e39?rik=b3BqFol2UflxTg&riu=http%3a%2f%2fmedia.blizzard.com%2fsc2%2fmedia%2fwallpapers%2fwall061%2fwall061-2048x1536-standard.jpg&ehk=jXwWdHYPWfF05LYezjDzXLEAKCTJENm0NRqh7bHGG6Y%3d&risl=&pid=ImgRaw&r=0",
    title: "Starw3t 2",
    price: 9.99,
    tagList: ["RPG", "Soulslike", "RTS", "Strategy", "MOBA", "Sandbox", "Open World"],
    platList: ["XBOX", "PC", "PS", "IOS", "ANDROID", "Linux", "SWITCH"],
    onClick: () => {
        console.log("Clicked");
    },
}

export default Card;