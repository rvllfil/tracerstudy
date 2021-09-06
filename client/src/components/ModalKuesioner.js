import Form from "react-bootstrap/Form"
import { connect } from "react-redux"
import { SuccessAlert, FailedAlert } from './Admin/AdminAlert'
import { clearAlert } from '../redux/actions/alertActions'
import { Spinner } from "react-bootstrap"


const ModalKuesioner = ({
  onKuesioner,
  onBio,
  onSubmit,
  dataKuesioner,
  bio,
  alert
}) => {
  return (
    <div className="modal fade" id="kuesioner" style={{display: 'none'}} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Kuesioner Tracer Study</h4>
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    onChange={onBio} 
                    // isInvalid={isInvalid.nisn ? 'true' : ''}
                    type="email" 
                    placeholder="Email" 
                    name='email'
                    value={bio.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan Email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>No. Telepon</Form.Label>
                  <Form.Control
                    onKeyDown={numeric} 
                    onChange={onBio} 
                    // isInvalid={isInvalid.nama ? 'true' : ''}
                    type="text" 
                    placeholder="No HP" 
                    name='no_hp'
                    value={bio.no_hp}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan NO Telepon.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control 
                    onChange={onBio} 
                    // isInvalid={isInvalid.nisn ? 'true' : ''}
                    type="text" 
                    placeholder="Alamat" 
                    name='alamat'
                    value={bio.alamat}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan Alamat.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status Alumni</Form.Label>
                  <Form.Control
                    onChange={onKuesioner}
                    // isInvalid={isInvalid.jenis_kelamin ? 'true' : ''}
                    as="select" 
                    name='status'
                    value={dataKuesioner.status}
                  >
                    <option disabled value=''>-- Status Sekarang --</option>
                    <option value='bekerja'>Bekerja</option>
                    <option value='melanjutkan kuliah'>Melanjutkan Kuliah</option>
                    <option value='wirausaha'>Wirausaha</option>
                    <option value='belum bekerja'>Belum Bekerja</option> 
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Harap masukan Status
                  </Form.Control.Feedback>
                </Form.Group>            
              </div>
              <div className="col-md-6">
                {dataKuesioner.status === 'bekerja' &&
                <>
                  <Form.Group>
                    <Form.Label>Nama Perusahaan</Form.Label>
                    <Form.Control 
                      onChange={onKuesioner} 
                      // isInvalid={isInvalid.nisn ? 'true' : ''}
                      type="text" 
                      placeholder="Nama Perusahaan" 
                      name='nama_perusahaan'
                      value={dataKuesioner.nama_perusahaan}
                    />
                    <Form.Control.Feedback type="invalid">
                      Harap masukan nama perusahaan.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Alamat Perusahaan</Form.Label>
                    <Form.Control 
                      onChange={onKuesioner} 
                      // isInvalid={isInvalid.nisn ? 'true' : ''}
                      type="text" 
                      placeholder="Alamat Perusahaan" 
                      name='alamat_perusahaan'
                      value={dataKuesioner.alamat_perusahaan}
                    />
                    <Form.Control.Feedback type="invalid">
                      Harap masukan alamat perusahaan.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Posisi/Jabatan di Tempat Kerja</Form.Label>
                    <Form.Control 
                      onChange={onKuesioner} 
                      // isInvalid={isInvalid.nisn ? 'true' : ''}
                      type="text" 
                      placeholder="Jabatan" 
                      name='jabatan'
                      value={dataKuesioner.jabatan}
                    />
                    <Form.Control.Feedback type="invalid">
                      Harap masukan Jabatan.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apakah pekerjaan anda sesuai dengna jurusan ketika sekolah</Form.Label>
                    <Form.Control
                      onChange={onKuesioner}
                      // isInvalid={isInvalid.jenis_kelamin ? 'true' : ''}
                      as="select" 
                      name='pekerjaan_sesuai_jurusan'
                      value={dataKuesioner.pekerjaan_sesuai_jurusan}
                    >
                      <option disabled value=''>-- --</option>
                      <option value='ya'>Ya</option>
                      <option value='tidak'>Tidak</option> 
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Harap masukan 
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Kisaran gaji per bulan</Form.Label>
                    <Form.Control
                      onChange={onKuesioner}
                      // isInvalid={isInvalid.jenis_kelamin ? 'true' : ''}
                      as="select" 
                      name='gaji'
                      value={dataKuesioner.gaji}
                    >
                      <option disabled value=''>-- kisaran gaji --</option>
                      <option value='< Rp. 2.000.000'>{'< Rp. 2.000.000'}</option>
                      <option value='Rp. 2.000.000 - Rp. 5.000.000'>Rp. 2.000.000 - Rp. 5.000.000</option>
                      <option value='Rp. 5.000.000 - Rp. 10.000.000'>Rp. 5.000.000 - Rp. 10.000.000</option>
                      <option value='> Rp. 10.000.000'>{'> Rp. 10.000.000'}</option> 
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Harap masukan kisaran gaji
                    </Form.Control.Feedback>
                  </Form.Group>    
                </>
                }

                {dataKuesioner.status === 'melanjutkan kuliah' && 
                <>
                  <Form.Group>
                    <Form.Label>Nama Perguruan Tinggi</Form.Label>
                    <Form.Control 
                      onChange={onKuesioner} 
                      // isInvalid={isInvalid.nisn ? 'true' : ''}
                      type="text" 
                      placeholder="Nama Perguruan Tinggi" 
                      name='nama_perguruan'
                      value={dataKuesioner.nama_perguruan}
                    />
                    <Form.Control.Feedback type="invalid">
                      Harap masukan nama perguruan tinggi.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Status Perguruan Tinggi</Form.Label>
                    <Form.Control
                      onChange={onKuesioner}
                      // isInvalid={isInvalid.jenis_kelamin ? 'true' : ''}
                      as="select" 
                      name='status_perguruan'
                      value={dataKuesioner.status_perguruan}
                    >
                      <option disabled value=''>-- --</option>
                      <option value='Negeri'>Negeri</option>
                      <option value='Swasta'>Swasta</option> 
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Harap masukan 
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Jurusan di Perguruan Tinggi</Form.Label>
                    <Form.Control 
                      onChange={onKuesioner} 
                      // isInvalid={isInvalid.nisn ? 'true' : ''}
                      type="text" 
                      placeholder="jurusan" 
                      name='jurusan'
                      value={dataKuesioner.jurusan}
                    />
                    <Form.Control.Feedback type="invalid">
                      Harap masukan nama jurusan.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apakah jurusan di perguruan tinggi sesuai dengan jurusan ketika sekolah</Form.Label>
                    <Form.Control
                      onChange={onKuesioner}
                      // isInvalid={isInvalid.jenis_kelamin ? 'true' : ''}
                      as="select" 
                      name='perguruan_sesuai_jurusan'
                      value={dataKuesioner.perguruan_sesuai_jurusan}
                    >
                      <option disabled value=''>-- --</option>
                      <option value='ya'>Ya</option>
                      <option value='tidak'>Tidak</option> 
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Harap masukan 
                    </Form.Control.Feedback>
                  </Form.Group>
                </>  
                }

                {dataKuesioner.status === 'wirausaha' &&
                <>
                  <Form.Group>
                    <Form.Label>Bidang Wirausaha</Form.Label>
                    <Form.Control 
                      onChange={onKuesioner} 
                      // isInvalid={isInvalid.nisn ? 'true' : ''}
                      type="text" 
                      placeholder="Bidang Wirausaha" 
                      name='bidang_wirausaha'
                      value={dataKuesioner.bidang_wirausaha}
                    />
                    <Form.Control.Feedback type="invalid">
                      Harap masukan bidang wirausaha.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Nama usaha</Form.Label>
                    <Form.Control 
                      onChange={onKuesioner} 
                      // isInvalid={isInvalid.nisn ? 'true' : ''}
                      type="text" 
                      placeholder="Nama usaha" 
                      name='nama_usaha'
                      value={dataKuesioner.nama_usaha}
                    />
                    <Form.Control.Feedback type="invalid">
                      Harap masukan nama usaha.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Kisaran pendapatan per bulan</Form.Label>
                    <Form.Control
                      onChange={onKuesioner}
                      // isInvalid={isInvalid.jenis_kelamin ? 'true' : ''}
                      as="select" 
                      name='pendapatan'
                      value={dataKuesioner.pendapatan}
                    >
                      <option disabled value=''>-- kisaran pendapatan --</option>
                      <option value='< Rp. 2.000.000'>{'< Rp. 2.000.000'}</option>
                      <option value='Rp. 2.000.000 - Rp. 5.000.000'>Rp. 2.000.000 - Rp. 5.000.000</option>
                      <option value='Rp. 5.000.000 - Rp. 10.000.000'>Rp. 5.000.000 - Rp. 10.000.000</option>
                      <option value='> Rp. 10.000.000'>{'> Rp. 10.000.000'}</option> 
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Harap masukan kisaran pendapatan
                    </Form.Control.Feedback>
                  </Form.Group>
                </>
                }

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
})(ModalKuesioner)
