import * as localStore from 'store'
import { LOAD_TODO, ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../actions'

const MYTODOS = 'MYTODOS'
const TIMEOUT = 300
const callApi = (action) => {
    return new Promise(function(resolve, reject) {
        let todos = localStore.get(MYTODOS) || []
        if (!!(window.localStorage || window.sessionStorage)) {
            try {
                switch (action.type) {
                    case LOAD_TODO:
                        setTimeout(function() {
                            resolve({todos})
                        }, TIMEOUT)
                        break
                    case ADD_TODO:
                        const newTodo = {
                            id: action.id,
                            text: action.text,
                            completed: false,
                            created: action.created
                        }
                        todos = [
                            newTodo,
                            ...todos
                        ]
                        localStore.set(MYTODOS, todos);
                        setTimeout(function() {
                            resolve(newTodo)
                        }, TIMEOUT)
                        break
                    case TOGGLE_TODO:
                        localStore.set(MYTODOS, todos.map(todo =>
                            (todo.id === action.id) ? {...todo, completed: !todo.completed } : todo
                        ))
                        setTimeout(function() {
                            resolve({ id: action.id })
                        }, TIMEOUT);
                        break
                    case DELETE_TODO:
                        localStore.set(MYTODOS, todos.filter(todo =>
                            todo.id !== action.id
                        ))
                        setTimeout(function() {
                            resolve({ id: action.id })
                        }, TIMEOUT);
                        break
                    default:
                        reject({ message: '发生未知错误！' })
                }

            } catch (e) {
                reject({ message: '浏览器禁用了localstorage' })
            }
        } else {
            reject({ message: '浏览器不支持localstorage' })
        }
    });
}

// 编写中间件进行数据持久化处理，主要是写到localstorage
export default store => next => action => {
    const { types } = action
    if (typeof types === 'undefined') {
        return next(action)
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = {...action, ...data}
        delete finalAction[types]
        return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({ type: requestType }))

    return callApi(action).then(
        response => next(actionWith({
            ...response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
}
