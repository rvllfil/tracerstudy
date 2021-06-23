import Form from "react-bootstrap/Form"
import { connect } from "react-redux"
import { SuccessAlert, FailedAlert } from './AdminAlert'
import { clearAlert } from '../../redux/actions/alertActions'
import { Spinner } from "react-bootstrap"


const ModalTambahAlumni = ({
  onChange, 
  onSubmit,
  dataAlumni,
  isInvalid,
  alert,
  clearAlert
}) => {
  return (
    <div className="modal fade" id="tambah" style={{display: 'none'}} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Tambah Alumni</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {
              alert.loading ?
                <div className='d-flex align-items-center justify-content-center p-5'> 
                  <Spinner style={{width: '4rem', height: '4rem'}} animation="border" variant='primary'/>
                </div> :
                alert.alert !== 0 ? 
                  alert.alert === 1 ? 
                    <SuccessAlert close={()=>clearAlert()} text={alert.msg}/> : 
                    alert.alert === 2 ? 
                    <FailedAlert close={()=>clearAlert()} text={alert.msg}/> : 
                  '' : 
                ''
            }
            <div className="row">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>NISN</Form.Label>
                  <Form.Control
                    onKeyDown={numeric} 
                    onChange={onChange} 
                    isInvalid={isInvalid.nisn ? 'true' : ''}
                    type="text" 
                    placeholder="NISN" 
                    name='nisn'
                    value={dataAlumni.nisn}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan NISN.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Nama</Form.Label>
                  <Form.Control 
                    onChange={onChange} 
                    isInvalid={isInvalid.nama ? 'true' : ''}
                    type="text" 
                    placeholder="Nama" 
                    name='nama'
                    value={dataAlumni.nama}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan Nama.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tempat Lahir</Form.Label>
                  <Form.Control 
                    onChange={onChange} 
                    isInvalid={isInvalid.tempat_lahir ? 'true' : ''}
                    type="text" 
                    placeholder="Tempat Lahir" 
                    name='tempat_lahir'
                    value={dataAlumni.tempat_lahir}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan tempat lahir.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control 
                    onChange={onChange} 
                    isInvalid={isInvalid.tanggal_lahir ? 'true' : ''}
                    type="date" 
                    placeholder="Tanggal Lahir" 
                    name='tanggal_lahir'
                    value={dataAlumni.tanggal_lahir}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan tanggal lahir.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Control
                    onChange={onChange}
                    isInvalid={isInvalid.jenis_kelamin ? 'true' : ''}
                    as="select" 
                    name='jenis_kelamin'
                    value={dataAlumni.jenis_kelamin}
                  >
                    <option disabled value=''>-- Jenis Kelamin --</option>
                    <option value='laki-laki'>Laki-laki</option>
                    <option value='perempuan'>Perempuan</option> 
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Harap masukan jenis kelamin
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Jurusan</Form.Label>
                  <Form.Control
                    onChange={onChange}
                    isInvalid={isInvalid.jurusan ? 'true' : ''}
                    as="select" 
                    name='jurusan'
                    value={dataAlumni.jurusan}
                  >
                    <option disabled value=''>-- Jurusan --</option>
                    <option value='Akuntansi Dan Keuangan Lembaga'>Akuntansi Dan Keuangan Lembaga</option>
                    <option value='Asisten Keperawatan'>Asisten Keperawatan</option>
                    <option value='Farmasi Klinis Dan Komunitas'>Farmasi Klinis Dan Komunitas</option>
                    <option value='Teknik Komputer Dan Jaringan'>Teknik Komputer Dan Jaringan</option>
                    <option value='Otomatisasi Dan Tata Kelola Perkantoran'>Otomatisasi Dan Tata Kelola Perkantoran</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Harap masukan jurusan.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tahun Lulus</Form.Label>
                  <Form.Control
                    onKeyDown={numeric} 
                    onChange={onChange} 
                    isInvalid={isInvalid.tahun_lulus ? 'true' : ''}
                    type="text" 
                    placeholder="Tahun Lulus" 
                    name='tahun_lulus'
                    value={dataAlumni.tahun_lulus}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan tahun lulus.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const numeric = e => {
  if(e.keyCode > 57) return e.preventDefault()
}

export default connect(null, {
  clearAlert
})(ModalTambahAlumni)
