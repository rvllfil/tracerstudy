import { connect } from 'react-redux'
import { Redirect, Route, useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

const PrivateRoute = ({ 
  comp: Component,
  auth: { user, isLoading }, 
  ...rest 
}) => {
  const [isMember, setIsMember] = useState(true)
  const history = useHistory()
  useEffect(() => {
    try {
      if (!isLoading && user.role === 'alumni') {
        setIsMember(true)
      } else if (!isLoading && user.role !== 'alumni') {
        setIsMember(false)
      }
    } catch (e) {
      setIsMember(false)
    }
    if(!isMember) {
      history.push('/login')
    }
  }, [user, isLoading, isMember, history])
  return (
    <>
      { isLoading ?
        <div className='d-flex min-vh-100 min-vw-100 align-items-center justify-content-center'> 
          <Spinner style={{width: '8rem', height: '8rem'}} animation="border" variant='primary'/>
        </div>:
        (<Route
          {...rest}
          render={props =>
            !isLoading && !isMember ? (     
            <Redirect to="/login" />
            ) : (
              <Component {...props} />
            )
          }
        />)
      }
    </>
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)