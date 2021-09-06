import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import RichText from './RichText'
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SuccessAlert, FailedAlert } from './AdminAlert'
import { clearAlert } from '../../redux/actions/alertActions'

const ModalTambahLoker = ({
  onChange,
  onSubmit,
  dataLoker,
  isInvalid,
  alert,
  clearAlert,
  onSelected,
  handleEditorChange,
  editorState
}) => {

  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Pilih Gambar')

  

  return (
    <div className="modal fade" id="tambah-loker" style={{display: 'none'}} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Tambah Informasi Lowongan Kerja</h4>
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
              <div className="col-md-12">
                <Form.Group>
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    // onKeyDown={numeric} 
                    onChange={onChange} 
                    isInvalid={isInvalid.nisn ? 'true' : ''}
                    type="text" 
                    placeholder="Judul" 
                    name='judul'
                    value={dataLoker.judul}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan Judul.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                <Form.Label>Isi</Form.Label>
                  <Form.Control
                    // isInvalid
                    type="text" 
                    style={{display: 'none'}}
                  />

                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                  />
                  {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}

                  <Form.Control.Feedback type="invalid">
                    Harap masukan Isi.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                <Form.Label>Untuk Jurusan</Form.Label>
                  <Form.Control
                    // isInvalid
                    type="text" 
                    style={{display: 'none'}}
                  />
                  <DropdownMultiselect
                    options={["AustraliaAkuntansi Dan Keuangan Lembaga", "Asisten Keperawatan", "Farmasi Klinis Dan Komunitas", "Teknik Komputer Dan Jaringan", "Otomatisasi Dan Tata Kelola Perkantoran"]}
                    name="Jurusan"
                    handleOnChange={onSelected}
                    placeholder='Pilih Jurusan'
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan jurusan.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                <Form.Label>Gambar</Form.Label>
                  <Form.Control
                    // onKeyDown={numeric} 
                    // onChange={onChange} 
                    // isInvalid={isInvalid.nisn ? 'true' : ''}
                    type="file" 
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    onChange={e => e.target.files[0].name} 
                    // name='nisn'
                    // value={dataAlumni.nisn}
                  />
                  <Form.Control.Feedback type="invalid">
                    Harap masukan Gambar.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" 
            onClick={onSubmit}
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(null, {
  clearAlert
})(ModalTambahLoker)