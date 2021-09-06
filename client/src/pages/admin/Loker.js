import ModalHapusLoker from '../../components/Admin/ModalHapusLoker'
import ModalTambahLoker from '../../components/Admin/ModalTambahLoker'
import ModalUbahLoker from '../../components/Admin/ModalUbahLoker'
import TableLoker from '../../components/Admin/TableLoker'
import Footer from '../../components/adminlte/Footer'
import Header from '../../components/adminlte/Header'
import Menu from '../../components/adminlte/Menu'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { retrieveLoker, createLoker, updateLoker } from '../../redux/actions/lokerActions'
import { clearAlert } from '../../redux/actions/alertActions'
import { Spinner } from 'react-bootstrap'
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

const Loker = ({
  retrieveLoker,
  createLoker,
  loker,
  loading,
  clearAlert,
  updateLoker,
  alert,
  admin
}) => {

  useEffect(() => {
    retrieveLoker()
  }, [retrieveLoker])

  const initDataLoker = {
    judul: '',
    isi: '',
    gambar: '',
    jurusan: '',
    admin_id: admin.id
  }
  const initDataLokerIsValid = {
    judul: false,
    isi: false,
    gambar: false,
    jurusan: false,
    admin_id: false
  }
  const [lokerIsValid, setLokerIsValid] = useState(initDataLokerIsValid)
  const [dataLoker, setDataLoker] = useState(initDataLoker)
  const [dataEditLoker, setDataEditLoker] = useState({
    id: '',
    judul: '',
    isi: '',
    gambar: '',
    jurusan: '',
    admin_id: ''
  })
  console.log('admin id', admin.id)

  const onChange = (e) => {
    setDataLoker({
      ...dataLoker,
      [e.target.name]: e.target.value 
    })
  }

  const onChangeUbah = (e) => {
    setDataEditLoker({
      ...dataEditLoker,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    let err = {}
    let isInValid = true
    if(!dataLoker.judul) {
      isInValid = false
      err.judul = true
    }
    if(!dataLoker.isi) {
      isInValid = false
      err.isi = true
    }
    if(!dataLoker.jurusan) {
      isInValid = false
      err.jurusan = true
    }
    setLokerIsValid({...isInValid, ...err})
    return isInValid
  }

  const validateUbah = () => {
    let err = {}
    let isInValid = true
    if(!dataEditLoker.judul) {
      isInValid = false
      err.judul = true
    }
    if(!dataEditLoker.isi) {
      isInValid = false
      err.isi = true
    }
    if(!dataEditLoker.jurusan) {
      isInValid = false
      err.jurusan = true
    }
    setLokerIsValid({...isInValid, ...err})
    return isInValid
  }

  const onSubmit = (e) => {
    if(validate()){
      console.log(dataLoker)
      createLoker(dataLoker)
      setDataLoker(initDataLoker)
    } 
  }

  const onSubmitUbah = (e) => {
    if(validateUbah()){
      updateLoker(dataEditLoker)
    } 
  }

  const onSelected = selected => {
    setDataLoker({
      ...dataLoker,
      jurusan: selected.toString()
    })  
  }

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
    setDataLoker({
      ...dataLoker,
      isi: convertedContent
    }) 
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  // const createMarkup = (html) => {
  //   return  {
  //     __html: DOMPurify.sanitize(html)
  //   }
  // }

  return (
    <div className='wrapper'>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="content pt-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="margin p-2">
                    <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#tambah-loker" 
                    // onClick={()=>clearAlert()}
                    >
                      <i className="fas fa-plus mr-2" />
                      Tambah Loker
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
              <TableLoker 
                datas={loker}
                setDataEditLoker={setDataEditLoker}
              />
            }
          </div>
          <ModalTambahLoker 
            onChange={onChange}
            onSubmit={onSubmit}
            dataLoker={dataLoker}
            isInvalid={lokerIsValid}
            alert={alert}
            onSelected={onSelected}
            handleEditorChange={handleEditorChange}
            editorState={editorState}
          />
          
          <ModalHapusLoker 
            dataLoker={dataEditLoker}
          />

          <ModalUbahLoker 
            onChange={onChangeUbah}
            onSubmit={onSubmitUbah}
            dataLoker={dataEditLoker}
            isInvalid={lokerIsValid}
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
    loker: state.loker.loker,
    loading: state.loker.loading,
    alert: state.alert,
    admin: state.auth.user
  }
}

export default connect(mapStateToProps, {
  retrieveLoker,
  createLoker,
  updateLoker,
  clearAlert
})(Loker)
