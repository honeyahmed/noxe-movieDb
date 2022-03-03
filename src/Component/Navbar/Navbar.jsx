import React from 'react'
import { Link ,NavLink} from 'react-router-dom';
export default function Navbar(props) {
 
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
    <div className="container-fluid">
    <a className="navbar-brand fw-bolder" href="Home">NOXE</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav" id='navbar'>
        {props.userData? <>
        <NavLink className="nav-link  " aria-current="page" to="home">Home</NavLink>
        <NavLink className="nav-link "  to="tv">Tv</NavLink>
        <NavLink className="nav-link "  to="movies">Movies</NavLink>
        <NavLink className="nav-link "   to="people">People</NavLink>
        </>:''}
  
     

      </div>
  
      <div className="navbar-nav ms-auto">
        <ul className='navbar-nav'>
          <li className='nav-item d-flex align-items-center me-3'>
           <a href={"https://www.linkedin.com/in/honey-ahmed-006801187/"} target="_blank"> <i className="fa-brands fa-linkedin-in me-3"></i> </a>
           <a href='https://github.com/honeyahmed'target="_blank"> <i className='fab fa-github me-3'></i></a>   
           <a href='https://www.facebook.com/Honey.Ahmed.Mohamed'target="_blank">  <i className='fab fa-facebook me-3'></i></a>  
           <a href='https://twitter.com/HoneyAhmedM'target="_blank">  <i className='fab fa-twitter me-3'></i></a>   
          </li>
        </ul>
        {
          props.userData? <>
            <li onClick={props.logout} className="nav-link logout" >Logout</li>

          </>:
          <>
          
        <Link className="nav-link"  to="register">Register</Link>
        <Link className="nav-link"  to="login">Login</Link>
          </>
        }



      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
