import "../styles/Cart.css"
import PropType from 'prop-types'

function Cart(props) {
    
}

Cart.propTypes = {
    items: PropType.array,
}

Cart.defaultProps = {
    items: [
        {gameID: "",
        quantity: 1,},
        {},
        {},
    ],
}

export default Cart;
