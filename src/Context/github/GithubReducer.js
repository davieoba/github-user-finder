const GithubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: [action.payload],
        loading: false
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }

    case 'CLEAR_USER':
      return {
        ...state,
        users: action.payload,
        user: action.payload
      }

    case 'SAVE_USER':
      return {
        ...state,

        savedUsers: state.savedUsers.includes(action.payload)
          ? [...state.savedUsers]
          : [...state.savedUsers, action.payload]
      }

    case 'REMOVE_SAVED':
      return {
        ...state,
        savedUsers: state.savedUsers.filter((el) => {
          return el !== action.payload
        })
      }

    case 'GET_USER':
      return {
        ...state,
        user: action.payload
      }

    default:
      return state
  }
}

export default GithubReducer
