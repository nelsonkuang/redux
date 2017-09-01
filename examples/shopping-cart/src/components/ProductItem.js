import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const ProductItem = ({ product, onAddToCartClicked, onDecreaseToCartClicked }) => (
  <div style={{ marginBottom: 20 }}>
    <Product
      title={product.title}
      price={product.price}
      inventory={product.inventory} />
    <button
      onClick={onDecreaseToCartClicked}
      disabled={product.quantity > 0 ? '' : 'disabled'}>
      {'-'}
    </button>
    <span> {product.quantity} </span>
    <button
      onClick={onAddToCartClicked}
      disabled={product.quantity < product.inventory ? '' : 'disabled'}>
      {'+'}
    </button>
  </div>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    quantity: PropTypes.number
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired,
  onDecreaseToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
