import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ModalKuesioner from '../components/ModalKuesioner'
import NavBar from '../components/Navbar'
import { alumniUpdate } from '../redux/actions/alumniAuthActions'
import { createKuesioner } from '../redux/actions/kuesionerActions'
import { retrieveOneAlumni } from '../redux/actions/alumniActions'
import { Spinner } from 'react-bootstrap'


const TracerStudy = ({user, alumniUpdate, createKuesioner, retrieveOneAlumni, alumni, loading, alert}) => {
  
  useEffect(() => {
    retrieveOneAlumni(user.email, user.nama)
  }, [retrieveOneAlumni, user])

  const initDataKuesioner = {
    alumni_id: '',
    status: '',
    nama_perusahaan : '',  
    alamat_perusahaan : '',  
    jabatan : '',  
    pekerjaan_sesuai_jurusan : '',  
    gaji : '',  
    nama_perguruan : '',  
    status_perguruan : '',  
    jurusan : '',  
    perguruan_sesuai_jurusan : '',  
    bidang_wirausaha : '',  
    nama_usaha : '',  
    pendapatan : ''  
  }
  const [dataKuesioner, setDataKuesioner] = useState(initDataKuesioner)
  const [bio, setBio] = useState({
    alamat: '',
    no_hp: '',
    email: ''
  })

  const onKuesioner = (e) => {
    setDataKuesioner({
      ...dataKuesioner,
      alumni_id: alumni.id,
      [e.target.name]: e.target.value 
    })
  }

  const onBio = (e) => {
    setBio({
      ...bio,
      [e.target.name]: e.target.value 
    })
  }

  const onSubmit = () => {
    alumniUpdate(bio, alumni.id)
    createKuesioner(dataKuesioner)
    
  }

  
  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="card">
          <div className="card-header h5">Kuesioner Tracer Study Alumni</div>
          <div className="card-body">
            <div className="px-5">
              <div className="row">
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
                <>
                  <div className="col-md-6">
                    {/* <div>
                      <p>Nama: </p>
                      <p className='font-weight-bold'>{alumni.nama}</p>
                    </div>
                    <div>
                      <p>NISN: </p>
                      <p className='font-weight-bold'>{alumni.nisn}</p>
                    </div>
                    <div>
                      <p>TTL: </p>
                      <p className='font-weight-bold'>{alumni.tempat_lahir}, {moment(alumni.tanggal_lahir)}</p>
                    </div>
                    <div>
                      <p>Jenis Kelamin: </p>
                      <p className='font-weight-bold'>{alumni.jenis_kelamin}</p>
                    </div>
                    <div>
                      <p>Alamat: </p>
                      <p className='font-weight-bold'>{alumni.alamat === null ? '-' : alumni.alamat}</p>
                    </div>
                    <div>
                      <p>Email: </p>
                      <p className='font-weight-bold'>{alumni.email === null ? '-' : alumni.email}</p>
                    </div>
                    <div>
                      <p>No Telepon: </p>
                      <p className='font-weight-bold'>{alumni.no_hp === null ? '-' : alumni.no_hp}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <p>Jurusan: </p>
                      <p className='font-weight-bold'>{alumni.jurusan}</p>
                    </div>
                    <div>
                      <p>Tahun Lulus: </p>
                      <p className='font-weight-bold'>{alumni.tahun_lulus}</p>
                    </div> */}
                    {/* <div>
                      <p>TTL: </p>
                      <p className='font-weight-bold'>{alumni.tempat_lahir}, {moment(alumni.tanggal_lahir)}</p>
                    </div>
                    <div>
                      <p>Jenis Kelamin: </p>
                      <p className='font-weight-bold'>{alumni.jenis_kelamin}</p>
                    </div>
                    <div>
                      <p>Alamat: </p>
                      <p className='font-weight-bold'>{alumni.alamat === null ? '-' : alumni.alamat}</p>
                    </div> */}
                  </div>
                </>
              }
              </div>
            </div>
            
            <div className="text-center">
              <p>Anda belum mengisi kuesioner tracer study alumni SMK Hassina.</p>
              <button className='btn btn-info' data-toggle="modal" data-target="#kuesioner">Isi Sekarang!</button>
            </div>
          </div>
        </div>
      </div>

      <ModalKuesioner 
        onKuesioner={onKuesioner}
        onBio={onBio}
        onSubmit={onSubmit}
        dataKuesioner={dataKuesioner}
        bio={bio}
        alert={alert}
      />
      
    </>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  alumni: state.alumni.alumni[0],
  loading: state.alumni.loading,
  alert: state.alert
})

const moment = (date) => {
  let dated = new Date(date)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  let result = dated.toLocaleDateString('id-ID', options)
  return result 
}


export default connect(mapStateToProps, {
  alumniUpdate,
  createKuesioner,
  retrieveOneAlumni
})(TracerStudy)
