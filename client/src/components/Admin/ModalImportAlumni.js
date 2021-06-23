import { Spinner } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { clearAlert } from '../../redux/actions/alertActions'
import { FailedAlert, SuccessAlert } from './AdminAlert'

const ModalImportAlumni = ({
  readExcel, 
  onSubmit, 
  isInvalid, 
  alert, 
  clearAlert
}) => {
  return (
    <div className="modal fade" id="import" style={{display: 'none'}} aria-hidden="true">
      <div className="modal-dialog modal-default">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Import Data Alumni</h4>
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
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-exclamation-triangle mr-3" />
                  Petunjuk
                </h3>
              </div>
              <div className="card-body">
                <p>Header:</p>
                <ul>
                  <li>row 1: nisn</li>
                  <li>row 2: nama</li>
                  <li>row 3: jenis_kelmain</li>
                  <li>row 4: tempat_lahir</li>
                  <li>row 5: tanggal_lahir (YYYY-MM-DD)</li>
                  <li>row 6: jurusan</li>
                  <li>row 7: tahun lulus</li>
                </ul>
              </div>
            </div>
            <Form.Group>
              <Form.File 
                id="exampleFormControlFile1" 
                label="Import data excel"
                onChange={(e) => {
                  const file = e.target.files[0]
                  readExcel(file)
                }} 
              />
              { isInvalid && <div className="text-danger mt-2">Harap upload data excel !</div>}
            </Form.Group>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default connect(null, {
  clearAlert
})(ModalImportAlumni)

