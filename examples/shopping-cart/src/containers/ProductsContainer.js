import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart, decreaseToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem'
import ProductsList from '../components/ProductsList'

const ProductsContainer = ({ products, addToCart, decreaseToCart }) => (
  <ProductsList title="商品列表">
    {products.map(product =>
      <ProductItem
        key={product.id}
        product={product}
        onDecreaseToCartClicked={() => decreaseToCart(product.id)}
        onAddToCartClicked={() => addToCart(product.id)} />
    )}
  </ProductsList>
)

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    quantity: PropTypes.number
  })).isRequired,
  addToCart: PropTypes.func.isRequired,
  decreaseToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  { addToCart, decreaseToCart }
)(ProductsContainer)
