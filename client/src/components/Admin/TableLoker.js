import { useState } from "react"

const TableLoker = ({datas, setDataEditLoker}) => {

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
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Data Informasi Loeongan Pekerjaan</h3>
            <div className="card-tools">
              <div className="input-group input-group-sm" style={{width: 150}}>
                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" 
                onChange={onSearch}
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
                {filtered.sort((a, b) => (a.create_at > b.create_at) ? 1 : -1).map((data, index)=> {
                  return ( 
                    <>
                      <tr 
                        key={index} 
                        data-widget='expandable-table' aria-expanded='false'>
                        <td>{data.judul}</td>
                        <td>{moment(data.create_at)}</td>
                        <td>
                          <button 
                              type="button" 
                              className="btn btn-info" 
                              data-toggle="modal" 
                              data-target="#ubah-loker" 
                            >
                              <i className="fas fa-info mr-2" />
                              Detail
                            </button>
                          <button 
                              type="button" 
                              className="btn btn-primary ml-2" 
                              data-toggle="modal" 
                              data-target="#ubah-loker" 
                              onClick={() => {
                                setDataEditLoker({
                                  id: data.id,
                                  judul: data.judul,
                                  isi: data.isi,
                                  gambar: data.gambar,
                                  jurusan: data.jurusan,
                                  admin_id: data.admin_id
                                })
                              }}
                            >
                              <i className="fas fa-edit mr-2" />
                              Ubah
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-danger ml-2" 
                              data-toggle="modal" 
                              data-target="#hapus-loker"
                              onClick={() => {
                                setDataEditLoker({
                                  id: data.id,
                                  judul: data.judul,
                                  isi: data.isi,
                                  gambar: data.gambar,
                                  jurusan: data.jurusan,
                                  admin_id: data.admin_id
                                })
                              }}
                            >
                              <i className="fas fa-trash mr-2" />
                              Hapus
                            </button>
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

export default TableLoker
