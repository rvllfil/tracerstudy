import { connect } from 'react-redux'
import { Redirect, Route, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect} from 'react'
import { Spinner } from 'react-bootstrap'

const AdminRoute = ({ 
  comp: Component,
  auth: { isAuthenticated, isLoading }, 
  ...rest 
}) => {
  const history = useHistory()
  useEffect(() => {
    if (!isLoading) {
      if(!isAuthenticated) {
        history.push('/admin/login')
      }
    }
  }, [isAuthenticated, isLoading, history])
  return (
    <>
      { isLoading ?
        <div className='d-flex min-vh-100 min-vw-100 align-items-center justify-content-center'> 
          <Spinner style={{width: '8rem', height: '8rem'}} animation="border" variant='primary'/>
        </div>:
        (<Route
          {...rest}
          render={props =>
            !isLoading && isAuthenticated ? (     
              <Component {...props} />
            ) : (  
              <Redirect to='/admin/login' />
            )
          }
        />)
      }
    </>
  )
}

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AdminRoute)