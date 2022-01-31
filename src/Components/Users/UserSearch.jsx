import { React, useState, useContext } from 'react'
import GithubContext from '../../Context/github/GithubContext'
import AlertContext from '../../Context/alert/AlertContext'

function UserSearch() {
  // const {setAlert} = useContext(AlertContext)
  const { fetchUser, users, clearUsers } = useContext(GithubContext)
  const [text, setText] = useState('')

  function handleChange(e) {
    setText(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!text) {
      // setAlert('please enter a search value', 'error')
      return 
    }
    fetchUser(text.trim().toLowerCase())
  }

  function handleClick(){
    setText('')
    clearUsers()
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
        {users.length > 0 && <button className="btn btn-ghost btn-lg" onClick={handleClick}>Clear</button>}
      </div>
    </div>
  )
}

export default UserSearch
