import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const User = ({ user }) => {
  const { login, avatarUrl, name, blog, location } = user

  return (
    <div className="User" style={{float:'left', marginRight:'20px', paddingBottom:'20px'}}>
      <Link to={`/${login}`}>
        <img src={avatarUrl} alt={login} width="72" height="72" style={{borderRadius:'50%'}}/>
        <h3 style={{paddingTop:0,marginTop:0}}>
          {login} {name && <span>({name})</span>}
        </h3>
      </Link>
      {blog && <span>个人主页：<a href={blog} target='_blank'>{blog}</a></span>}
      {location && <span>　所在地：{location}</span>}
    </div>
  )
}

User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string,
    blog: PropTypes.string,
    location: PropTypes.string
  }).isRequired
}

export default User
