import React from 'react'
import PropTypes from 'prop-types'

const Posts = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
    	<li key={i}>
    		{post.author.avatar_url && <img src={post.author.avatar_url} style={{width:'50px',height:'50px',borderRadius:'50%'}} />}
    		<a href={post.url} target="_blank">{post.title}</a>
    	</li>
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
