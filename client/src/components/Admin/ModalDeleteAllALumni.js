import { connect } from "react-redux"
import { deleteAllAlumni } from '../../redux/actions/alumniActions'

const ModalDeleteAllALumni = ({deleteAllAlumni}) => {
  return (
    <div className="modal fade" id="deleteAllAlumni" style={{display: 'none'}} aria-hidden="true">
      <div className="modal-dialog modal-default">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Hapus Semua Data Alumni</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            Apakah anda yakin untuk menghapus semua data alumni.
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => deleteAllAlumni()}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(null, {
  deleteAllAlumni
})(ModalDeleteAllALumni)
