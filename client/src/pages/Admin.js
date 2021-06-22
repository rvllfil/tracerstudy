import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import NavBar from '../components/adminNavbar'
import Home from '../components/Admin/Home'

const Admin = ({user, loadingUsers}) => {
  return (
    <>
      { loadingUsers ?
        <div className='d-flex min-vh-100 min-vw-100 align-items-center justify-content-center'> 
          <Spinner style={{width: '8rem', height: '8rem'}} animation="border" variant='primary'/>
        </div>:
        <>
          <Home />
        </>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loadingUsers: state.auth.loading 
  }
}

export default connect(mapStateToProps)(Admin)
