import { useNavigate } from "react-router-dom";
import "../styles/SearchDropDown.css";
import PropTypes from 'prop-types';

function SearchDropDown(props) {

    let navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/game/${id}`);
    };

    return (
        <div className="search-dropdown">
            {props.results.map((result) => (
                <div key={result.id} className="search-result-item" onClick={() => handleClick(result.id)}>
                    <img src={result.background_image} alt={result.title} />
                    <span className="search-result-item-info">
                        <div className="search-result-item-title">{result.name}</div>
                    </span>
                </div>)
            )}
        </div>
    );
}


SearchDropDown.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
};

export default SearchDropDown;
