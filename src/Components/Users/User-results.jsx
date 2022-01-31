import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GithubContext from '../../Context/github/GithubContext'

function UserResults() {
  const { loading, fetchUser, users, saved } = useContext(GithubContext)

  //   useEffect(() => {
  //     fetchUser()
  //   }, [])

  const handleClick = (e) => {
    e.preventDefault()
    const targ = e.target.closest('div').querySelector('.card-title')
    const userName = targ.textContent

    saved(userName)
  }

  const dataElements =
    users.length > 0 &&
    users[0].items.slice(0, 5).map((el) => {
      return (
        <div className="card shadow-md compact side bg-base-100" key={el.id}>
          <div className="flex-row items-center space-x-4 card-body">
            <div>
              <div className="avatar">
                <div className="rounded-full shadow w-14 h-14">
                  <img src={el.avatar_url} alt="Profile" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="card-title">{el.login}</h2>
              <Link
                className="text-base-content text-opacity-40 mr-10"
                to={`/user/${el.login}`}
              >
                Visit Profile
              </Link>
              <button className="btn btn-xs" onClick={handleClick}>
                Save
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 ml-1 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )
    })
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {loading && (
        <button className="btn btn-sm btn-outline btn-primary loading">
          loading
        </button>
      )}
      {users.length > 0 ? dataElements : ''}
    </div>
  )
}

export default UserResults
