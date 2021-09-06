import { useState } from "react"


const DataAlumni = ({ datas }) => {

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


  

  return (
    <div className="row mt-3">
      <div className="col-12">
        <div className="container">
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
                    <th>Tahunn Lulus</th>
                    <th>Jurusan</th>
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
                          <td>{data.tahun_lulus}</td>
                          <td className='text-capitalize'>{data.jurusan}</td>
                        </tr>
                        <tr key={key} className='expandable-body d-none'>
                          <td colSpan="5">
                            <div style={{display: 'none'}}>
                              <ul>
                                <li>NISN: <strong>{data.nisn}</strong></li>
                                <li>Nama: <strong>{data.nama}</strong></li>
                                <li>Tahun Lulus: <strong>{data.tahun_lulus}</strong></li>
                                <li>Jurusan: <strong>{data.jurusan}</strong></li>
                              </ul>                          
                            </div>
                          </td>
                        </tr>
                      </>
                    )  
                  })}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
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

export default DataAlumni
