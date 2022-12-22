import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'




const Home = () => {
    const {user}=useContext(AuthContext)

  return (
    <div>
    You are logged in to the Home Page
    {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default Home