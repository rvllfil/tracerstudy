import Header from '../adminlte/Header'
import Menu from '../adminlte/Menu'
import Content from '../adminlte/Content'
import Footer from '../adminlte/Footer'
import StatusChart from './StatusChart'
import BekerjaChart from './BekerjaChart'

const Home = () => {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="content pt-3">
          <div className="container-fluid">
            <div className="row">
              <div class="col-lg-6 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>3</h3>
                    <p>Jumlah Alumni Yang Sudah Mengisi Kuesioner</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>66</h3>
                    <p>Jumlah Alumni Yang Terdaftar</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {/* <StatusChart />
              <BekerjaChart /> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
