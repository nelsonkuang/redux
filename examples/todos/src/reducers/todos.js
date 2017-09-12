import { LOAD_REQUEST, LOAD_FAILURE, LOAD_SUCCESS, 
  ADD_REQUEST, ADD_SUCCESS, ADD_FAILURE, 
  TOGGLE_REQUEST, TOGGLE_SUCCESS, TOGGLE_FAILURE, 
  DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE} from '../actions'

const todos = (state = {data:[]}, action) => {
  switch (action.type) {
    case LOAD_REQUEST:    
    case ADD_REQUEST:    
    case TOGGLE_REQUEST:
    case DELETE_REQUEST:
      return {
        data: [...state.data],
        operating: true
        }
    case LOAD_FAILURE:   
    case TOGGLE_FAILURE:      
    case ADD_FAILURE:
    case DELETE_FAILURE:
      return {
        data: [...state.data],
        operating: false,
        error: action.error
      }

    case LOAD_SUCCESS:
      return {
        data: [...action.todos],          
        operating: false
      }  

    case ADD_SUCCESS:
      return {
        data: [
          {
            id: action.id,
            text: action.text,
            completed: false,
            created: action.created
          },
          ...state.data
        ],          
        operating: false
      }  

    case TOGGLE_SUCCESS:
      return {
        data: state.data.map(todo =>
          (todo.id === action.id) 
          ? {...todo, completed: !todo.completed}
          : todo),
        operating: false
      }

    case DELETE_SUCCESS:
      return {
        data: state.data.filter(todo => todo.id !== action.id),
        operating: false
      }

    default:
      return state
  }
}

export default todos
