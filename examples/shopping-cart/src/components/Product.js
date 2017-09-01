import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, title, quantity }) => {
	if(quantity) {
		return (
		  <div>
			  {title} - <b>价格：</b>&#36;{price}
			  <b> 库存：</b> {inventory} 
			  <b> 数量：</b> {quantity} <b> 小计：</b>&#36;{(quantity * price).toFixed(2)}
		  </div>
        )
    }else{
		return (
		  <div>
			  {title} - <b>价格：</b>&#36;{price}
			  <b> 库存：</b> {inventory} 
		  </div>
        )	
    }
}

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  quantity: PropTypes.number
}

export default Product
