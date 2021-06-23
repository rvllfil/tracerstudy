import React from 'react'

const TableAlumni = ({datas}) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Data Alumni</h3>
            <div className="card-tools">
              <div className="input-group input-group-sm" style={{width: 150}}>
                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
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
                  <th>NISN</th>
                  <th>Nama</th>
                  <th>Jenis Kelamin</th>
                  <th>Tempat Tanggal Lahir</th>
                  <th>Jurusan</th>
                  <th>Tahunn Lulus</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index)=> {
                  return (
                    <tr key={index}>
                      <td>{data.nisn}</td>
                      <td className='text-capitalize'>{data.nama}</td>
                      <td className='text-capitalize'>{data.jenis_kelamin}</td>
                      <td className='text-capitalize'>{`${data.tempat_lahir}, ${moment(data.tanggal_lahir)}`}</td>
                      <td className='text-capitalize'>{data.jurusan}</td>
                      <td>{data.tahun_lulus}</td>
                    </tr>
                  )  
                })}
                
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

const moment = (date) => {
  let dated = new Date(date)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  let result = dated.toLocaleDateString('id-ID', options)
  return result 
}

export default TableAlumni
