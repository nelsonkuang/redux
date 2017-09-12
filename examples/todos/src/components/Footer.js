import React from 'react'
import FilterLink from '../containers/FilterLink'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../actions'

const Footer = () => (
  <p className="todos__filterlink">
    显示:
    {" "}
    <FilterLink filter={ SHOW_ALL }>
      所有
    </FilterLink>
    {", "}
    <FilterLink filter={ SHOW_ACTIVE }>
      进行中
    </FilterLink>
    {", "}
    <FilterLink filter={ SHOW_COMPLETED }>
      已完成
    </FilterLink>
  </p>
)

export default Footer
