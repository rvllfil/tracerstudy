import { useEffect, useState } from 'react'
import TableAlumni from '../../components/Admin/TableAlumni'
import { connect } from 'react-redux'
import { retrieveAlumni, createAlumni } from '../../redux/actions/alumniActions'
import { Spinner } from 'react-bootstrap'
import Footer from '../../components/adminlte/Footer'
import Header from '../../components/adminlte/Header'
import Menu from '../../components/adminlte/Menu'
import ModalTambahAlumni from '../../components/Admin/ModalTambahAlumni'
import ModalImportAlumni from '../../components/Admin/ModalImportAlumni'


const Alumni = ({
  retrieveAlumni,
  createAlumni,
  alumni,
  loading
}) => {
  useEffect(() => {
    retrieveAlumni()
  }, [retrieveAlumni])

  const initDataAlumni = {
    nisn: '',
    nama: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jurusan: '',
    tahun_lulus: ''
  }
  const initDataAlumniIsValid = {
    nisn: false,
    nama: false,
    jenis_kelamin: false,
    tempat_lahir: false,
    tanggal_lahir: false,
    jurusan: false,
    tahun_lulus: false
  }
  const [alumniIsValid, setAlumniIsValid] = useState(initDataAlumniIsValid)
  const [dataAlumni, setDataAlumni] = useState(initDataAlumni)
  const [show, setShow] = useState(0)
  const onChange = (e) => {
    setDataAlumni({
      ...dataAlumni,
      [e.target.name]: e.target.value 
    })
  }

  const validate = () => {
    let err = {}
    let isInValid = true
    if(!dataAlumni.nisn) {
      isInValid = false
      err.nisn = true
    }
    if(!dataAlumni.nama) {
      isInValid = false
      err.nama = true
    }
    if(!dataAlumni.jenis_kelamin) {
      isInValid = false
      err.jenis_kelamin = true
    }
    if(!dataAlumni.tempat_lahir) {
      isInValid = false
      err.tempat_lahir = true
    }
    if(!dataAlumni.tanggal_lahir) {
      isInValid = false
      err.tanggal_lahir = true
    }
    if(!dataAlumni.jurusan) {
      isInValid = false
      err.jurusan = true
    }
    if(!dataAlumni.tahun_lulus) {
      isInValid = false
      err.tahun_lulus = true
    }
    setAlumniIsValid({...isInValid, ...err})
    return isInValid
  }


  const onSubmit = (e) => {
    if(validate()){
      createAlumni(dataAlumni)
      setShow(1)
    }
  }

  const closeAlert = (e) => {
    setShow(0)
  }

  return (
    <div className='wrapper'>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="content mt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="margin p-2">
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#tambah" onClick={() => setShow(0)}>
                    <i className="fas fa-plus mr-2" />
                    Tambah Alumni
                  </button>
                  <button type="button" className="btn btn-primary ml-2" data-toggle="modal" data-target="#import">
                    <i className="fas fa-file-import mr-2" />
                    Import
                  </button>
                  </div>
                </div>
              </div>
            </div>
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
              <TableAlumni datas={alumni}/>
            }
          </div>

          <ModalTambahAlumni 
            onChange={onChange}
            onSubmit={onSubmit}
            dataAlumni={dataAlumni}
            isInvalid={alumniIsValid}
            showAlert={show}
            closeAlert={closeAlert}
          />
          
          <ModalImportAlumni />

        </div>
      </div>
      <Footer /> 
    </div>
  )
}



const mapStateToProps = (state) => {
  return {
    alumni: state.alumni.alumni,
    loading: state.alumni.loading,
  }
}

export default connect(mapStateToProps, {
  retrieveAlumni,
  createAlumni
})(Alumni)
