import React from 'react'
import PropTypes from 'prop-types'

const Picker = ({ value, name, onChange, options }) => (
  <span>
    <h1>{name}</h1>
    <select onChange={e => onChange(e.target.value)}
            value={value}>
      {options.map(option =>
        <option value={option.value} key={option.value}>
          {option.name}
        </option>)
      }
    </select>
  </span>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired
  }).isRequired).isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
