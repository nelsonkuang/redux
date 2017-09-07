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

    console.log('action', action)
    console.log('state after', state)
  }
}
/**
 * 调用window.fetch异步获取数据，浏览器兼容需要引入bebel-polyfill
 *
 * @param {String} topic
 * @returns {Array} 根据topic返回相应的贴子posts.
 */
export function fetchPostsApi(topic) {
    return fetch(`https://cnodejs.org/api/v1/topics?tab=${topic}`)
            .then(response => response.json() )
            .then(json => json.data.map(child => child) )
}

/**
 * 获取数据生成器
 *
 * @param {String} topic
 */
export function* fetchPosts(topic) {
  yield put( actions.requestPosts(topic) )
  const posts = yield call(fetchPostsApi, topic)
  yield put( actions.receivePosts(topic, posts) )
}

/**
 * 刷新主题数据生成器
 *
 */
export function* invalidateTopic() {
  while (true) {
    const {topic} = yield take(actions.INVALIDATE_TOPIC)
    yield call( fetchPosts, topic )
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
      yield fork(fetchPosts, newTopic)
  }
}

/**
 * 开始初始化生成器
 *
 */
export function* startup() {
  const selectedTopic = yield select(selectedTopicSelector)
  yield fork(fetchPosts, selectedTopic)
}

export default function* root() {
  yield fork(watchAndLog) // 注意：在生产环境中要注释掉
  yield fork(startup)
  yield fork(nextTopicChange)
  yield fork(invalidateTopic)
}