import { React, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import GithubContext from '../Context/github/GithubContext'

function Saved() {
  let { savedUsers, removeSaved } = useContext(GithubContext)
  const [userData, setUserData] = useState([])

  let isMounted = true

  const fetchUser = async () => {
    const data = savedUsers.map(async (el) => {
      let response = await fetch(`https://api.github.com/users/${el}`, {
        headers: {
          Authorization: `token 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`
        }
      })
      const doc = await response.json()
      return doc
    })

    const users = await Promise.all(data)
    setUserData(users)
  }

  const handleClick = (e) => {
    const userName = e.target
      .closest('div')
      .querySelector('.card-title').textContent

    removeSaved(userName)
    if (isMounted === false) return

    setUserData((prev) => {
      return prev.filter((el) => {
        return el.login !== userName
      })
    })
  }

  useEffect(() => {
    fetchUser()

    return () => {
      isMounted = false
    }
  }, [savedUsers])

  const dataElements =
    userData.length > 0 &&
    userData.map((el) => {
      return (
        <div
          className="card shadow-md compact side bg-base-100 mb-10"
          key={el.id}
        >
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
                Remove
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

  return <div>{dataElements}</div>
}

export default Saved
