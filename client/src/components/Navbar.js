import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
import Logout from './Logout'

const NavBar = ({auth}) => {
  console.log(auth.isAuthenticated)
  return (
    <>
      <nav className="navbar navbar-expand navbar-cyan navbar-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item hide">
              <div className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars lg"/></div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link d-flex flex-row align-items-center">
                <img src={logo} alt="logo" width="30px"/>
                <div className="ml-2 font-weight-bold text-white" style={{fontSize: '22px'}}>SMK Hassina</div>
              </Link>
            </li></ul>
          <ul className="navbar-nav ml-auto hidenav">
            <li className="nav-item">
              <Link to="/tracer-study" className="nav-link font-weight-bold">
                Tracer Study
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/data-alumni" className="nav-link font-weight-bold">
                Data Alumni
              </Link>
            </li>
            { auth.isAuthenticated &&
              <li className="nav-item">
                {/* <Link to="/data-alumni" className="nav-link"> */}
                  <Logout sty='nav-link font-weight-bold' />
                {/* </Link> */}
              </li>
            }
            { !auth.isAuthenticated &&
              <li className="nav-item">
                <Link to="/login" className="nav-link font-weight-bold">
                  Login
                </Link>
              </li>
            }
          </ul>
        </div>
      </nav>

      <aside className="main-sidebar sidebar-light-cyan elevation-4 hide">
      <div className="brand-link d-flex flex-column">
        <div></div>
        <i className="nav-icon fas fa-window-close ml-auto mr-2" style={{fontSize: '30px'}} data-widget="pushmenu" role="button"/>
      </div>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Menu */}
        <nav className="">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
              with font-awesome or any other icon font library */}
            <li className="nav-item navitem">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-home" />
                <p>
                  Home
                </p>
              </Link>
            </li>
            <li className="nav-item navitem">
              <Link to="/tracer-study" className="nav-link">
                <i className="nav-icon fas fa-search" />
                <p>
                  Tracer Study
                </p>
              </Link>
            </li>
            <li className="nav-item navitem">
              <Link to="/data-alumni" className="nav-link">
                <i className="nav-icon fas fa-user-graduate" />
                <p>
                  Data Alumni
                </p>
              </Link>
            </li>
            { auth.isAuthenticated &&
              <li className="nav-item navitem">
                <Link className="nav-link d-flex align-items-center">
                <i className="nav-icon fas fa-sign-out-alt" />
                <Logout />
                </Link>
                
              </li>
            }
          </ul>
        </nav>
      </div>
    </aside>
    <div id="sidebar-overlay" data-widget="pushmenu" role="button"></div>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(NavBar)
