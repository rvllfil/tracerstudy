import TableKuesioner from '../../components/Admin/TableKuesioner'
import Footer from '../../components/adminlte/Footer'
import Header from '../../components/adminlte/Header'
import Menu from '../../components/adminlte/Menu'

const DataTracer = () => {
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
                  <TableKuesioner />
                </div>
              </div>            
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DataTracer
