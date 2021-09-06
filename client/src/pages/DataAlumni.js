import { useEffect, useState } from 'react'
import TableAlumni from '../components/TableAlumni'
import { connect } from 'react-redux'
import { retrieveAlumni } from '../redux/actions/alumniActions'
import { Spinner } from 'react-bootstrap'
import NavBar from '../components/Navbar'

const DataAlumni = ({
  retrieveAlumni,
  alumni,
  loading
}) => {

  useEffect(() => {
    retrieveAlumni()
  }, [retrieveAlumni])


  return (
    <>
      <NavBar />
      { loading ?   
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className='d-flex align-items-center justify-content-center p-5'> 
                <Spinner style={{width: '4rem', height: '4rem'}} animation="border" variant='primary'/>
              </div>
            </div>
          </div>
        </div>:
        <TableAlumni 
          datas={alumni}
        />
      }
    </>
  )
}



const mapStateToProps = (state) => {
  return {
    alumni: state.alumni.alumni,
    loading: state.alumni.loading
  }
}

export default connect(mapStateToProps, {
  retrieveAlumni
})(DataAlumni)
