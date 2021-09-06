
const TablePelatihan = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Data Pelatihan</h3>
            <div className="card-tools">
              <div className="input-group input-group-sm" style={{width: 150}}>
                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" 
                // onChange={onSearch}
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-default">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /.card-header */}
          <div className="card-body table-responsive p-0">
            <table className="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Posted Date</th>
                  {/* <th>Jenis Kelamin</th>
                  <th>Tempat Tanggal Lahir</th> */}
                  {/* <th>Jurusan</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* {filtered.sort((a, b) => (a.nisn > b.nisn) ? 1 : -1).map((data, index)=> {
                  let key = 'data'+index */}
                  {/* return ( */}
                    <>
                      <tr 
                        // key={index} 
                        data-widget='expandable-table' aria-expanded='false'>
                        <td>Pelatihan Membuat CV yang baik</td>
                        <td>3 Juli 2021</td>
                        <td>
                          <button 
                              type="button" 
                              className="btn btn-info" 
                              // data-toggle="modal" 
                              // data-target="#ubah-loker" 
                              // onClick={() => {
                              //   setDataEditAlumni({
                              //     id: data.id,
                              //     nisn: data.nisn,
                              //     nama: data.nama,
                              //     jenis_kelamin: data.jenis_kelamin,
                              //     tempat_lahir: data.tempat_lahir,
                              //     tanggal_lahir: data.tanggal_lahir,
                              //     jurusan: data.jurusan,
                              //     tahun_lulus: data.tahun_lulus
                              //   })
                              //   clearAlert()
                              // }}
                            >
                              <i className="fas fa-info mr-2" />
                              Detail
                            </button>
                          <button 
                              type="button" 
                              className="btn btn-primary ml-2" 
                              data-toggle="modal" 
                              data-target="#ubah-pelatihan" 
                              // onClick={() => {
                              //   setDataEditAlumni({
                              //     id: data.id,
                              //     nisn: data.nisn,
                              //     nama: data.nama,
                              //     jenis_kelamin: data.jenis_kelamin,
                              //     tempat_lahir: data.tempat_lahir,
                              //     tanggal_lahir: data.tanggal_lahir,
                              //     jurusan: data.jurusan,
                              //     tahun_lulus: data.tahun_lulus
                              //   })
                              //   clearAlert()
                              // }}
                            >
                              <i className="fas fa-edit mr-2" />
                              Ubah
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-danger ml-2" 
                              data-toggle="modal" 
                              data-target="#hapus-pelatihan"
                              // onClick={() => {
                              //   setDataEditAlumni({
                              //     id: data.id,
                              //     nisn: data.nisn,
                              //     nama: data.nama,
                              //     jenis_kelamin: data.jenis_kelamin,
                              //     tempat_lahir: data.tempat_lahir,
                              //     tanggal_lahir: data.tanggal_lahir,
                              //     jurusan: data.jurusan,
                              //     tahun_lulus: data.tahun_lulus
                              //   })
                              //   clearAlert()
                              // }}
                            >
                              <i className="fas fa-trash mr-2" />
                              Hapus
                            </button>
                          </td>
                      </tr>
                      <tr 
                        // key={index} 
                        data-widget='expandable-table' aria-expanded='false'>
                        <td>Pelatihan Membuat Aplikasi Web</td>
                        <td>3 Juli 2021</td>
                        <td>
                          <button 
                              type="button" 
                              className="btn btn-info" 
                              // data-toggle="modal" 
                              // data-target="#ubah-loker" 
                              // onClick={() => {
                              //   setDataEditAlumni({
                              //     id: data.id,
                              //     nisn: data.nisn,
                              //     nama: data.nama,
                              //     jenis_kelamin: data.jenis_kelamin,
                              //     tempat_lahir: data.tempat_lahir,
                              //     tanggal_lahir: data.tanggal_lahir,
                              //     jurusan: data.jurusan,
                              //     tahun_lulus: data.tahun_lulus
                              //   })
                              //   clearAlert()
                              // }}
                            >
                              <i className="fas fa-info mr-2" />
                              Detail
                            </button>
                          <button 
                              type="button" 
                              className="btn btn-primary ml-2" 
                              data-toggle="modal" 
                              data-target="#ubah-loker" 
                              // onClick={() => {
                              //   setDataEditAlumni({
                              //     id: data.id,
                              //     nisn: data.nisn,
                              //     nama: data.nama,
                              //     jenis_kelamin: data.jenis_kelamin,
                              //     tempat_lahir: data.tempat_lahir,
                              //     tanggal_lahir: data.tanggal_lahir,
                              //     jurusan: data.jurusan,
                              //     tahun_lulus: data.tahun_lulus
                              //   })
                              //   clearAlert()
                              // }}
                            >
                              <i className="fas fa-edit mr-2" />
                              Ubah
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-danger ml-2" 
                              data-toggle="modal" 
                              data-target="#hapus-loker"
                              // onClick={() => {
                              //   setDataEditAlumni({
                              //     id: data.id,
                              //     nisn: data.nisn,
                              //     nama: data.nama,
                              //     jenis_kelamin: data.jenis_kelamin,
                              //     tempat_lahir: data.tempat_lahir,
                              //     tanggal_lahir: data.tanggal_lahir,
                              //     jurusan: data.jurusan,
                              //     tahun_lulus: data.tahun_lulus
                              //   })
                              //   clearAlert()
                              // }}
                            >
                              <i className="fas fa-trash mr-2" />
                              Hapus
                            </button>
                          </td>
                      </tr>
                    </>
                  {/* )  
                })}
                 */}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </div>
  )
}

export default TablePelatihan
