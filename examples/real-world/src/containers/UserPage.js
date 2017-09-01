/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadUser, loadOwn, loadStarred } from '../actions'
import User from '../components/User'
import OwnRepo from '../components/OwnRepo'
import StarredRepo from '../components/StarredRepo'
import List from '../components/List'
import zip from 'lodash/zip'

const loadData = ({ login, loadOwn, loadUser, loadStarred }) => {
  loadUser(login, [ 'name' ])
  loadOwn(login)
  loadStarred(login)
}

class UserPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    user: PropTypes.object,
    starredPagination: PropTypes.object,
    starredRepos: PropTypes.array.isRequired,
    starredRepoOwners: PropTypes.array.isRequired,
    loadUser: PropTypes.func.isRequired,
    loadStarred: PropTypes.func.isRequired,
    loadOwn: PropTypes.func.isRequired
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    }
  }

  handleLoadMoreStarredRepoClick = () => {
    this.props.loadStarred(this.props.login, true)
  }

  handleLoadMoreOwnRepoClick = () => {
    this.props.loadOwn(this.props.login, true)
  }

  renderStarredRepo([ repo, owner ]) {
    return (
      <StarredRepo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    )
  }

  renderOwnRepo([ repo, owner ]) {
    return (
      <OwnRepo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    )
  }  

  render() {
    const { user, login } = this.props
    if (!user) {
      return <h1><i>正在加载 {login}{"的个人资料..."}</i></h1>
    }

    const { ownRepos, ownRepoOwners, ownPagination, starredRepos, starredRepoOwners, starredPagination } = this.props
    console.log(ownRepos)
    return (
      <div>
        <User user={user} />
        <hr />
        <div style={{width:'50%',float:'left'}}>
          <h2>{login} 的个人项目如下：</h2>
          <List renderItem={this.renderOwnRepo}
                items={zip(ownRepos, ownRepoOwners)}
                onLoadMoreClick={this.handleLoadMoreOwnRepoClick}
                loadingLabel={`正在加载 ${login}的个人项目...`}
                {...ownPagination} />
        </div>
        <div style={{width:'50%',float:'left'}}>
          <h2>{login} 关注的项目如下：</h2>
          <List renderItem={this.renderStarredRepo}
                items={zip(starredRepos, starredRepoOwners)}
                onLoadMoreClick={this.handleLoadMoreStarredRepoClick}
                loadingLabel={`正在加载 ${login}关注的项目...`}
                {...starredPagination} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase()

  const {
    pagination: { starredByUser, ownedByUser },
    entities: { users, repos }
  } = state

  const ownPagination = ownedByUser[login] || { ids: [] }
  const ownRepos = ownPagination.ids.map(id => repos[id])
  const ownRepoOwners = ownRepos.map(repo => users[repo.owner])

  const starredPagination = starredByUser[login] || { ids: [] }
  const starredRepos = starredPagination.ids.map(id => repos[id])
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

  return {
    login,
    ownRepos,
    ownRepoOwners,
    ownPagination,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login]
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadOwn,
  loadStarred
})(UserPage)
