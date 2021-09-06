import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { clearAlert } from "../../redux/actions/alertActions"

const TableAlumni = ({
  datas, 
  setDataEditAlumni, 
  clearAlert,
}) => {

  const [filtered, setFiltered] = useState(datas)

  const toStr = (str) => {
    if(str === null){
      return ''
    } else if(Number.isInteger(str)) {
      return str.toString()
    } else {
      return str
    }
  }

  const onSearch = (e) => {
    const input = e.target.value
    const search = input.toLowerCase()
    if(datas.length > 0){
      setFiltered(datas.filter(item => {
        return Object.keys(item).some(key => toStr(item[key]).toLowerCase().includes(search)
        )
      }))
    }    
  }

useEffect(() => {
    setFiltered(datas)
  }, [datas])
  

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Data Alumni</h3>
            <div className="card-tools">
              <div className="input-group input-group-sm" style={{width: 150}}>
                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" onChange={onSearch}/>
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
                  {/* <th>Jenis Kelamin</th>
                  <th>Tempat Tanggal Lahir</th> */}
                  {/* <th>Jurusan</th> */}
                  <th>Tahunn Lulus</th>
                </tr>
              </thead>
              <tbody>
                {filtered.sort((a, b) => (a.nisn > b.nisn) ? 1 : -1).map((data, index)=> {
                  let key = 'data'+index
                  return (
                    <>
                      <tr key={index} data-widget='expandable-table' aria-expanded='false'>
                        <td>{data.nisn}</td>
                        <td className='text-capitalize'>{data.nama}</td>
                        {/* <td className='text-capitalize'>{data.jenis_kelamin}</td>
                        <td className='text-capitalize'>{`${data.tempat_lahir}, ${moment(data.tanggal_lahir)}`}</td> */}
                        {/* <td className='text-capitalize'>{data.jurusan}</td> */}
                        <td>{data.tahun_lulus}</td>
                      </tr>
                      <tr key={key} className='expandable-body d-none'>
                        <td colSpan="5">
                          <div style={{display: 'none'}}>
                            <ul>
                              <li>NISN: <strong>{data.nisn}</strong></li>
                              <li>Nama: <strong>{data.nama}</strong></li>
                              <li>Jenis Kelamin: <strong>{data.jenis_kelamin}</strong></li>
                              <li>TTL: <strong>{data.tempat_lahir}, {moment(data.tanggal_lahir)}</strong></li>
                              <li>Jurusan: <strong>{data.jurusan}</strong></li>
                              <li>Tahun Lulus: <strong>{data.tahun_lulus}</strong></li>
                            </ul>
                            <button 
                              type="button" 
                              className="btn btn-primary" 
                              data-toggle="modal" 
                              data-target="#ubah" 
                              onClick={() => {
                                setDataEditAlumni({
                                  id: data.id,
                                  nisn: data.nisn,
                                  nama: data.nama,
                                  jenis_kelamin: data.jenis_kelamin,
                                  tempat_lahir: data.tempat_lahir,
                                  tanggal_lahir: data.tanggal_lahir,
                                  jurusan: data.jurusan,
                                  tahun_lulus: data.tahun_lulus
                                })
                                clearAlert()
                              }}
                            >
                              <i className="fas fa-edit mr-2" />
                              Ubah
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-danger ml-3" 
                              data-toggle="modal" 
                              data-target="#hapus"
                              onClick={() => {
                                setDataEditAlumni({
                                  id: data.id,
                                  nisn: data.nisn,
                                  nama: data.nama,
                                  jenis_kelamin: data.jenis_kelamin,
                                  tempat_lahir: data.tempat_lahir,
                                  tanggal_lahir: data.tanggal_lahir,
                                  jurusan: data.jurusan,
                                  tahun_lulus: data.tahun_lulus
                                })
                                clearAlert()
                              }}
                            >
                              <i className="fas fa-trash mr-2" />
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
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

export default connect(null, {
  clearAlert
})(TableAlumni)
