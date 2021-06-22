import { Fragment } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { logout } from '../redux/actions/authAction'

const Logout = ({logout, sty}) => {
  const history = useHistory()
  const click = () => {
    logout(history)
  }
  return (
    <Fragment>
      <div className={sty} onClick={click}>Logout</div>
    </Fragment>
  )
}

export default connect(null, {
  logout
})(Logout)
