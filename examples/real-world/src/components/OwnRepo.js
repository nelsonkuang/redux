import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const OwnRepo = ({ repo, owner }) => {
  const { login } = owner
  const { name, description, createdAt } = repo

  return (
    <div className="Repo">
      <h3>
        <Link to={`/${login}/${name}`}>
          {name}
        </Link>
        {' | 创建时间：'}
        <span style={{fontWeight:400}}>{new Date(createdAt).toLocaleDateString() + ' ' + new Date(createdAt).toLocaleTimeString()}</span>
      </h3>
      {description &&
        <p>{description}</p>
      }
    </div>
  )
}

OwnRepo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired
  }).isRequired
}

export default OwnRepo
