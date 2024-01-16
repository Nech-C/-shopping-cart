import { useEffect, useState } from "react";
import "../styles/SearchNavBar.css";
import PropTypes from 'prop-types';
import { searchGames } from "../../lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchNavBar(props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchQuery !== "") {
            // As the user types, the search is triggered and the dropdown opens
            setIsDropdownOpen(true);
            searchGames(searchQuery).then((results) => {
                setSearchResults(results);
            });
        } else {
            setIsDropdownOpen(false);
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="search-nav-bar">
            <span className="search">
                <input
                    className="search-input"
                    onChange={handleSearchQueryChange}
                    value={searchQuery}
                    />
                <button className="search-button"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                {isDropdownOpen && searchResults.length > 0 && (
                    <div className="search-dropdown">
                        {searchResults.map((result, index) => (
                            <div key={index} className="search-result-item">
                                {/* Render your result item */}
                                {result.title}
                            </div>
                        ))}
                    </div>
                )}
                
            </span>
            <span className="search-dropdown">
            </span>
            <span className="cart">
                <FontAwesomeIcon icon={faCartShopping} />
            </span>
        </div>
    );
}

SearchNavBar.propTypes = {

}

SearchNavBar.defaultProps = {
    
}

export default SearchNavBar;
