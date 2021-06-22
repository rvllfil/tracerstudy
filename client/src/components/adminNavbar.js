import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { BoxArrowLeft, List, PersonCircle, XLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import logo1 from '../img/logo.png'
import Logout from './Logout';
const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className='navbar'>
        <div className='menu-bars bg-red'>
          <div className='d-flex align-items-center bg-primary p-2'>
            <List size={30} onClick={showSidebar} color='#fff'/>
          </div>
        </div>
        <Link to='/home' className=''>
          <img src={logo1} alt="logo" width="50px"/>
          <div>SMK HASSINA</div>
        </Link>
        <div></div>
        
        <Nav className="ml-auto nav">
          <Link to='/profil' className='py-auto'>
            <div className='h6 font-weight-bold'>Profil</div>
          </Link>
          <Link to='/home' className='py-auto ml-4'>
            <Logout sty='h6 font-weight-bold'/>
          </Link>
        </Nav>
        
      </div>
      
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className='pt-5 pl-5 d-flex flex-column justify-content-start'>
          <div className='d-flex flex-row-reverse mr-5'>
            <XLg color='white' size={30} onClick={showSidebar}/>
          </div>
          <Link to='/profil' className='d-flex flex-row align-items-center mt-2 py-4'>
            <PersonCircle size={30} color='#fff'/>
            <div className='h-100 my-auto d-block h4 ml-4 text-white align-middle'>Profil</div>
          </Link>
          <Link to='/home' className='d-flex flex-row align-items-center mt-2 py-4'>
            <BoxArrowLeft size={30} color='#fff'/>
            <Logout sty='h-100 my-auto d-block h4 ml-4 text-white align-middle'/>
          </Link>
        </div>
      </nav>
      {sidebar && <div className='overlay' onClick={showSidebar}></div>}
    </>
  );
}
export default NavBar
