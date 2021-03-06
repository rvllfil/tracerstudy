import { Link, useLocation } from 'react-router-dom'
import avatar from '../../img/avatar.png'
import logo from '../../img/logo.png'


const Menu = () => {
  const location = useLocation();
  const path = location.pathname
  return (
    <aside className="main-sidebar sidebar-dark-cyan elevation-4">
      {/* Brand Logo */}
      <Link to='/admin' className="brand-link">
        <img src={logo} alt="SMK HASSINA Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">SMK HASSINA</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={avatar} alt="UserImage" className=''/>
          </div>
          <div className="info">
            <div className="d-block h-4 text-white">Admin</div>
          </div>
        </div>
        
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
              with font-awesome or any other icon font library */}
            <li className="nav-item">
              <Link to="/admin" className={`nav-link ${path === '/admin' ? 'active': ''}`}>
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            
            {/* <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-table" />
                <p>
                  Tables
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/tables/simple.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Simple Tables</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/tables/data.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>DataTables</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/tables/jsgrid.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>jsGrid</p>
                  </a>
                </li>
              </ul>
            </li> */}
            <li className="nav-item">
              <Link to="/admin/alumni" className={`nav-link ${path === '/admin/alumni' ? 'active': ''}`}>
                <i className="nav-icon fas fa-table" />
                <p>
                  Alumni
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/tracer-study" className={`nav-link ${path === '/admin/tracer-study' ? 'active': ''}`}>
                <i className="nav-icon fas fa-search" />
                <p>
                  Tracer Study
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/loker" className={`nav-link ${path === '/admin/loker' ? 'active': ''}`}>
                <i className="nav-icon fas fa-newspaper" />
                <p>
                  Lowongan Kerja
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/pelatihan" className={`nav-link ${path === '/admin/pelatihan' ? 'active': ''}`}>
                <i className="nav-icon fas fa-newspaper" />
                <p>
                  Pelatihan
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}

export default Menu
