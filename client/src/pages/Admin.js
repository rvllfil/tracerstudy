import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

const Admin = ({user, loadingUsers}) => {
  return (
    <div>
      { loadingUsers ?
        <div className='d-flex min-vh-100 min-vw-100 align-items-center justify-content-center'> 
          <Spinner style={{width: '8rem', height: '8rem'}} animation="border" variant='primary'/>
        </div>:
        <>Hello</>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loadingUsers: state.auth.loading 
  }
}

export default connect(mapStateToProps)(Admin)
