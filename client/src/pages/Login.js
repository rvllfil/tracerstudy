import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import logo from '../img/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/actions/authAction'
import { ExclamationCircle } from 'react-bootstrap-icons'

const Login = ({login, error}) => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [isInValid, setIsInValid] = useState({
    email: false,
    password: false
  })
  const [message, setMessage] = useState('')
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const validate = () => {
    let err = {}
    let isInValid = true
    if(!data.email) {
      isInValid = false
      err.email = true
    }
    if(!data.password) {
      isInValid = false
      err.password = true
    }
    setIsInValid({...isInValid, ...err})
    return isInValid
  }
  const history = useHistory()
  const onSubmit = async (e) => {
    e.preventDefault()
    if(validate()){
      setIsInValid({
        password: false,
        confirmed: false
      })
      
      await login(data, history)
      console.log(data)
    }
    setData({
      email: '',
      password: ''
    })
  }

    
  useEffect((prevProps) => {
    if (error !== prevProps) {
      // check for Login error
      if (error.id === 'LOGIN_FAIL') {
        setMessage(error.msg.msg)
      }
    }
    
  }, [error])

  return (
    <>
      <div className='cont'>
        <div className='mt-5 d-flex justify-content-center'>
          <img className='py-5 mt-3' src={logo} alt="Logo SMK Hassina" width="150" />
        </div>
        <Form className='px-2 mt-2' method='post' onSubmit={onSubmit}>
          <Form.Group className=' mt-4'>
            <Form.Control 
              onChange={onChange}
              isInvalid={isInValid.email ? 'true' : ''}
               
              type="text" 
              placeholder="email" 
              name='email'
              value={data.email}
            />
            <Form.Control.Feedback type="invalid">
              Harap masukan email.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className='mb-4 mt-4'>
            <Form.Control 
              onChange={onChange}
              isInvalid={isInValid.password ? 'true' : ''}
               
              type="password" 
              placeholder="Password" 
              name='password'
              value={data.password}
            />
            <Form.Control.Feedback type="invalid">
              Harap masukan password.
            </Form.Control.Feedback>
          </Form.Group>
          {message && 
            <div className='mb-2 d-flex flex-row'>
              <ExclamationCircle size={24} color='red'/>
              <h5 className='violett ml-2 text-danger'>{message}</h5>
            </div>
          }
          <Button  className='violet font-weight-bold' variant="primary" type="submit" block>
            MASUK
          </Button>
          {/* <div className='mt-5 d-flex flex-row justify-content-center mb-5'>
            <div>Tidak punya akun ?</div>
            <Link className='violett ml-2' to='/daftar'>Daftar</Link>
          </div> */}
        </Form>
      </div>
    </>
  )
}


const mapStateToProps = state => ({
  error: state.error
})

export default connect(mapStateToProps, {
  login
})(Login)
