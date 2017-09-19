import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from '../actions'
import { selectedTopicSelector, postsByTopicSelector } from '../reducers/selectors'

/**
 * watchAndLog是一个简单的logger用于打印redux中的action和最新的state
 * 注意：在生产环境中要注释掉
 * 
 * 引用自：https://redux-saga.js.org/docs/advanced/FutureActions.html
 */
export function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('%cAction - ' + action.type, 'color:blue;font-size:18px;', action)
    console.log('%cState After: ', 'color:green;font-size:16px;', state)
  }
}

export const FIRSTPAGE = 1
export const PAGELIMIT = 20
/**
 * 调用window.fetch异步获取数据，浏览器兼容需要引入bebel-polyfill
 *
 * @param {String} topic
 * @returns {Array} 根据topic返回相应的贴子posts.
 */
export function fetchPostsApi(topic, page) {
    return fetch(`https://cnodejs.org/api/v1/topics?tab=${topic}&page=${page}&limit=${PAGELIMIT}`)
            .then(response => response.json() )
            .then(json => json.data.map(child => child) )
            .catch(error => console.log(error))
}

/**
 * 获取数据生成器
 *
 * @param {String} topic
 */
export function* fetchPosts(topic, page) {
  yield put( actions.requestPosts(topic, page) )
  const posts = yield call(fetchPostsApi, topic, page)
  yield put( actions.receivePosts(topic, posts, page) )
}

/**
 * 刷新主题数据生成器
 *
 */
export function* invalidateTopic() {
  while (true) {
    const {topic} = yield take(actions.INVALIDATE_TOPIC)
    yield call( fetchPosts, topic, FIRSTPAGE)
  }
}

/**
 * 加载更多数据生成器
 *
 */
export function* loadMoreByTopic() {
  while (true) {
    const {topic, page} = yield take(actions.LOADMORE_POSTS)
    yield call( fetchPosts, topic, page)
  }
}

/**
 * 主题选择改变触发生成器
 *
 */
export function* nextTopicChange() {
  while(true) {
    const prevTopic = yield select(selectedTopicSelector)
    yield take(actions.SELECT_TOPIC)

    const newTopic = yield select(selectedTopicSelector)
    const postsByTopic = yield select(postsByTopicSelector)
    if(prevTopic !== newTopic && !postsByTopic[newTopic])
      yield fork(fetchPosts, newTopic, FIRSTPAGE)
  }
}

/**
 * 开始初始化生成器
 *
 */
export function* startup() {
  const selectedTopic = yield select(selectedTopicSelector)
  yield fork(fetchPosts, selectedTopic, FIRSTPAGE)
}

export default function* root() {
  yield fork(watchAndLog) // 注意：在生产环境中要注释掉
  yield fork(startup)
  yield fork(nextTopicChange)
  yield fork(invalidateTopic)
  yield fork(loadMoreByTopic)
}