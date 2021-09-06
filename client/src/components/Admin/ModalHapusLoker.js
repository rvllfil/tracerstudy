const ModalHapusLoker = () => {
  return (
  <div className="modal fade" id="hapus-loker" style={{display: 'none'}} aria-hidden="true">
      <div className="modal-dialog modal-default">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Hapus Data Informasi Lowongan Pekerjaan</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Apakah anda yakin untuk menghapus data informasi lowongan pekerjaan.
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal" 
            // onClick={() => deleteAlumni(dataAlumni.id)}
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalHapusLoker
