import React from "react";
import { Link } from "react-router-dom";

const NavBar = ()=> {
    return (
    <nav>
    <div className="nav-wrapper black">
      <Link to="/" className="brand-logo left">Memestragram</Link>
      <ul id="nav-mobile" className="right">
        <li><Link to="/signin">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
        <li><Link to="/create">Create Post</Link></li>
      </ul>
    </div>
  </nav>
    )
}

export default NavBar