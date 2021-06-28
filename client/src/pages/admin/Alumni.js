import { useEffect, useState } from 'react'
import TableAlumni from '../../components/Admin/TableAlumni'
import { connect } from 'react-redux'
import { retrieveAlumni, createAlumni, createBatchAlumni, updateAlumni } from '../../redux/actions/alumniActions'
import { clearAlert } from '../../redux/actions/alertActions'
import { Spinner } from 'react-bootstrap'
import Footer from '../../components/adminlte/Footer'
import Header from '../../components/adminlte/Header'
import Menu from '../../components/adminlte/Menu'
import ModalTambahAlumni from '../../components/Admin/ModalTambahAlumni'
import ModalImportAlumni from '../../components/Admin/ModalImportAlumni'
import * as XLSX from 'xlsx'
import ModalDeleteAllALumni from '../../components/Admin/ModalDeleteAllALumni'
import ModalUbahAlumni from '../../components/Admin/ModalUbahAlumni'
import ModalHapusAlumni from '../../components/Admin/ModalHapusAlumni'

const Alumni = ({
  retrieveAlumni,
  createAlumni,
  createBatchAlumni,
  alumni,
  loading,
  clearAlert,
  updateAlumni,
  alert
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
    tahun_lulus: false,
    file: false
  }
  const [alumniIsValid, setAlumniIsValid] = useState(initDataAlumniIsValid)
  const [dataAlumni, setDataAlumni] = useState(initDataAlumni)
  const [batchAlumni, setBatchAlumni] = useState([])
  const [dataEditAlumni, setDataEditAlumni] = useState({
    id: '',
    nisn: '',
    nama: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jurusan: '',
    tahun_lulus: ''
  })

  const onChange = (e) => {
    setDataAlumni({
      ...dataAlumni,
      [e.target.name]: e.target.value 
    })
  }

  const onChangeUbah = (e) => {
    setDataEditAlumni({
      ...dataEditAlumni,
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

  const validateUbah = () => {
    let err = {}
    let isInValid = true
    if(!dataEditAlumni.nisn) {
      isInValid = false
      err.nisn = true
    }
    if(!dataEditAlumni.nama) {
      isInValid = false
      err.nama = true
    }
    if(!dataEditAlumni.jenis_kelamin) {
      isInValid = false
      err.jenis_kelamin = true
    }
    if(!dataEditAlumni.tempat_lahir) {
      isInValid = false
      err.tempat_lahir = true
    }
    if(!dataEditAlumni.tanggal_lahir) {
      isInValid = false
      err.tanggal_lahir = true
    }
    if(!dataEditAlumni.jurusan) {
      isInValid = false
      err.jurusan = true
    }
    if(!dataEditAlumni.tahun_lulus) {
      isInValid = false
      err.tahun_lulus = true
    }
    setAlumniIsValid({...isInValid, ...err})
    return isInValid
  }

  const onSubmit = (e) => {
    if(validate()){
      createAlumni(dataAlumni)
      setDataAlumni(initDataAlumni)
    } 
  }

  const onSubmitUbah = (e) => {
    if(validateUbah()){
      updateAlumni(dataEditAlumni)
    } 
  }

  const fileValidate = () => {
    let err = {}
    let isInValid = true
    if(batchAlumni.length < 1) {
      isInValid = false
      err.file = true
    }
    setAlumniIsValid({...isInValid, ...err})
    return isInValid
  }

  const onSubmitBatch = (e) => {
    if(fileValidate()){
      createBatchAlumni(batchAlumni)
    } 
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result
        const wb = XLSX.read(bufferArray, {type: 'buffer'})
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws)
        resolve(data)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })

    promise.then((d) => {
      setBatchAlumni(d)
    })
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
                    <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#tambah" onClick={()=>clearAlert()}>
                      <i className="fas fa-plus mr-2" />
                      Tambah Alumni
                    </button>
                    <button type="button" className="btn btn-primary ml-2" data-toggle="modal" data-target="#import" onClick={()=>clearAlert()}>
                      <i className="fas fa-file-import mr-2" />
                      Import Excel
                    </button>
                    <button type="button" className="btn btn-danger ml-2" data-toggle="modal" data-target="#deleteAllAlumni">
                      <i className="fas fa-trash mr-2" />
                      Hapus Semua Data
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
              <TableAlumni 
                datas={alumni}
                setDataEditAlumni={setDataEditAlumni}
              />
            }
          </div>

          <ModalTambahAlumni 
            onChange={onChange}
            onSubmit={onSubmit}
            dataAlumni={dataAlumni}
            isInvalid={alumniIsValid}
            alert={alert}
          />
          
          <ModalImportAlumni 
            readExcel={readExcel}
            onSubmit={onSubmitBatch}
            isInvalid={alumniIsValid.file}
            alert={alert}
          />

          <ModalDeleteAllALumni />

          <ModalHapusAlumni 
            dataAlumni={dataEditAlumni}
          />

          <ModalUbahAlumni 
            onChange={onChangeUbah}
            onSubmit={onSubmitUbah}
            dataAlumni={dataEditAlumni}
            isInvalid={alumniIsValid}
            alert={alert}
          />

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
    alert: state.alert
  }
}

export default connect(mapStateToProps, {
  retrieveAlumni,
  createAlumni,
  createBatchAlumni,
  updateAlumni,
  clearAlert
})(Alumni)
