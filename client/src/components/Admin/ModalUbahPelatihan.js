import Form from 'react-bootstrap/Form'
const ModalUbahPelatihan = () => {
  return (
    <div className="modal fade" id="ubah-pelatihan" style={{display: 'none'}} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Ubah Pelatihan</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {/* {
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
            } */}
            <div className="row">
              <div className="col-md-12">
                <Form.Group>
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    // onKeyDown={numeric} 
                    // onChange={onChange} 
                    // isInvalid={isInvalid.nisn ? 'true' : ''}
                    type="text" 
                    // placeholder="NISN" 
                    // name='nisn'
                    value='Pelatihan Membuat CV yang baik'
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan NISN.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                <Form.Label>Isi</Form.Label>
                  <Form.Control
                    // onKeyDown={numeric} 
                    // onChange={onChange} 
                    // isInvalid={isInvalid.nisn ? 'true' : ''}
                    type="textarea" 
                    // placeholder="NISN" 
                    // name='nisn'
                    // value={dataAlumni.nisn}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan NISN.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                <Form.Label>Gambar</Form.Label>
                  <Form.Control
                    // onKeyDown={numeric} 
                    // onChange={onChange} 
                    // isInvalid={isInvalid.nisn ? 'true' : ''}
                    type="file" 
                    // placeholder="NISN" 
                    // name='nisn'
                    // value={dataAlumni.nisn}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan NISN.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" 
            // onClick={onSubmit}
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalUbahPelatihan
