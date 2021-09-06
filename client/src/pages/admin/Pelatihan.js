import ModalHapusPelatihan from '../../components/Admin/ModalHapusPelatihan'
import ModalTambahPelatihan from '../../components/Admin/ModalTambahPelatihan'
import ModalUbahPelatihan from '../../components/Admin/ModalUbahPelatihan'
import TablePelatihan from '../../components/Admin/TablePelatihan'
import Footer from '../../components/adminlte/Footer'
import Header from '../../components/adminlte/Header'
import Menu from '../../components/adminlte/Menu'

const Pelatihan = () => {
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
                    <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#tambah-pelatihan" 
                    // onClick={()=>clearAlert()}
                    >
                      <i className="fas fa-plus mr-2" />
                      Tambah Pelatihan
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <TablePelatihan />
          </div>
          <ModalTambahPelatihan />
          <ModalUbahPelatihan />
          <ModalHapusPelatihan />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Pelatihan
