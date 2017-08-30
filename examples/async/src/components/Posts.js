import React from 'react'
import PropTypes from 'prop-types'

const Posts = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
    	<li key={i}>
    		{post.author.avatar_url && <img src={post.author.avatar_url} style={{width:'50px',height:'50px',borderRadius:'50%'}} />}
    		{post.top && <span className="top">[置顶]</span>}
    		{post.title}
    		<span className="time">{new Date(post.create_at).toLocaleDateString() + ' ' + new Date(post.create_at).toLocaleTimeString()}</span>
    	</li>
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
