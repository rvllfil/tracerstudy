import { Fragment } from 'react'
import { Link } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { logoutAlumni } from '../redux/actions/authAction'

const Logout = ({logoutAlumni, sty}) => {
  const history = useHistory()
  const click = () => {
    logoutAlumni(history)
  }
  return (
    <Fragment>        
      <div className={sty} onClick={click} style={{cursor: 'pointer'}}>
        Logout
      </div>
    </Fragment>
  )
}

export default connect(null, {
  logoutAlumni
})(Logout)
