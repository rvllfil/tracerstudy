import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['Sesuai', 'Tidak'],
  datasets: [
    {
      label: '# of Votes',
      data: [1, 1],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [  
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const BekerjaChart = () => (
  <>
    <div className="col-md-6">
      <div className="card card-Info">
        <div className="card-header">
          <h3 className="card-title">Presentase Alumni Bekerja Sesuai Dengan Jurusan Di Sekolah</h3>
        </div>
        <div className="card-body">
          <Pie data={data} />
        </div>
      </div>
    </div>
  </>
);

export default BekerjaChart;