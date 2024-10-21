import React from 'react'
import { logOut } from '../../firebase'
import './home.css'

const Home = () => {
  return (
    <div id='home'>
      <p>Welcome to Home page</p>

      <button onClick={() => logOut()}>Logout</button>
    </div>
  )
}

export default Home
