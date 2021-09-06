import NavBar from '../components/Navbar'
import Form from 'react-bootstrap/Form'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loginAlumni } from '../redux/actions/authAction'

const Masuk = ({error, loginAlumni}) => {
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
      
      await loginAlumni(data, history)
      console.log(data)
    }
    // setData({
    //   email: '',
    //   password: ''
    // })
  }

    
  useEffect((prevProps) => {
    if (error !== prevProps) {
      // check for Login error
      if (error.id === 'LOGIN_FAIL') {
        setMessage(error.msg.msg)
      }
    }    
  }, [error])

  console.log(message)

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mt-4">
              <div className="card-body h5 text-center font-weight-bold">
                Penelusuran Alumni (Tracer Study) SMK Hassina Sukabumi
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-body" style={{fontSize: '17px'}}>
                <p>Tujuan dari pelacakan alumni ini dilakukan untuk memperoleh informasi dan keberadaan alumni SMK Hassina baik dalam masa transisi maupun ketika sudah memasuki dunia kerja.</p>
                <p>Hasil dari survey ini akan menjadi umpan balik yang sangat berguna bagi SMK Hassina untuk pengembangan kedepannya. Oleh karena itu, kami mohon kesediaan pada alumni yang terhormat untuk dapat mengisi kuesioner ini.</p>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card">
              <div className="card-body">
                <Form.Group>
                  <Form.Control 
                    onChange={onChange} 
                    isInvalid={isInValid.email ? 'true' : ''}
                    type="text" 
                    placeholder="NISN" 
                    name='email'
                    value={data.email}
                  />
                  <p><small>Lupa NISN? 
                    <Link to='/data-alumni'>
                      klik disini
                    </Link>
                  </small></p>
                  <Form.Control.Feedback type="invalid">
                    Harap masukan NISN.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    onChange={onChange} 
                    isInvalid={isInValid.password ? 'true' : ''}
                    type="password" 
                    placeholder="Tanggal Lahir" 
                    name='password'
                    value={data.password}
                  />
                  <p><small>Gunakan format tanggal/bulan/tahun contoh: 1/2/1999</small></p>
                  <Form.Control.Feedback type="invalid">
                    Harap masukan Tanggal Lahir.
                  </Form.Control.Feedback>
                </Form.Group>
                <p className='text-danger'><small>{message}</small></p>
                <button onClick={onSubmit} className='btn btn-primary'><i className='fas fa-sign-in-alt'></i> Masuk</button>
                
              </div>            
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

const mapStateToProps = state => ({
  error: state.error
})

export default connect(mapStateToProps, {
  loginAlumni
})(Masuk)
