import { createContext, useEffect, useReducer } from 'react'
import GithubReducer from './GithubReducer'

const GithubContext = createContext()
const githubApi = process.env.REACT_APP_GITHUB_API

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    savedUsers: [],
    newSavedUsers: [],
    user: {}
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  const fetchUser = async (name) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    })

    const params = new URLSearchParams({
      q: name
    })

    const response = await fetch(`${githubApi}/search/users?${params}`)
    const data = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: data
    })
  }

  const saved = (user) => {
    dispatch({
      type: 'SAVE_USER',
      payload: user
    })
  }

  const removeSaved = (user) => {
    dispatch({
      type: 'REMOVE_SAVED',
      payload: user
    })
  }

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USER',
      payload: ''
    })
  }

  const getUser = async (user) => {
    const response = await fetch(`https://api.github.com/users/${user}`)
    const data = await response.json()

    dispatch({
      type: 'GET_USER',
      payload: data
    })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUser: fetchUser,
        saved: saved,
        savedUsers: state.savedUsers,
        dispatch: dispatch,
        clearUsers,
        newSavedUsers: state.newSavedUsers,
        removeSaved,
        getUser,
        user: state.user
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext

// api.github.com/search/users?q:davieoba
