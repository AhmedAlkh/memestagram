import React, {useContext} from "react";
import { render } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from '../App'

const NavBar = ()=> {
  const{state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const renderList = ()=>{
    if(state) {
      return [
        <li><Link to="/profile">My Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        <li><Link to="/myfollowingpost">Following feed</Link></li>,
        <li>
          <button className="btn waves-effect waves-light red" onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            navigate('/signin')
            // changed from navigate.push to just navigate. Solved typeError.
           }}
           >
                Signout
          </button>
        </li>
      ]
    } else {
      return [
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">Sign Up</Link></li>
      ]
    }
  }
    return (
    <nav>
    <div className="nav-wrapper black">
      <Link to={state?"/":"/signin"} className="brand-logo left">Memestragram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default NavBar