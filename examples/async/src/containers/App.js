import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectTopic, invalidateTopic, loadMoreByTopic } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    selectedTopic: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  handleChange = nextTopic => {
    this.props.dispatch(selectTopic(nextTopic))
  }

  handleRefreshClick = e => {
    e.preventDefault()
    const { dispatch, selectedTopic } = this.props
    dispatch(invalidateTopic(selectedTopic))
  }

  handleLoadMore() {
    const { dispatch, selectedTopic, currentPage } = this.props
    dispatch(loadMoreByTopic(selectedTopic, currentPage + 1))
  }

  render() {
    const { selectedTopic, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    const optionsArr = [ {value:'ask',name:'问答'}, {value:'share',name:'分享'}, {value:'job',name:'招聘'}, {value:'good',name:'精华'} ]
    const selectedTopicName = 'CNode 社区 ' + (optionsArr.find(option => option.value === selectedTopic)).name + ' 板块'
    return (
      <div>
        <Picker value={selectedTopic}
                name={selectedTopicName}
                onChange={this.handleChange}
                options={optionsArr} />
        <p>
          {lastUpdated &&
            <span>
              上一次的更新时间： {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              刷新
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>加载中...</h2> : <h2>空。</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
        <button style={{ fontSize: '150%', display: 'block', float: 'left', clear: 'both' }}
                onClick={this.handleLoadMore}
                disabled={isFetching}>
          {isFetching ? '加载中...' : '加载更多'}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedTopic, postsByTopic } = state
  const {
    isFetching,
    lastUpdated,
    items: posts,
    currentPage
  } = postsByTopic[selectedTopic] || {
    isFetching: true,
    items: []
  }

  return {
    selectedTopic,
    posts,
    currentPage,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
