import { Pie } from 'react-chartjs-2';

const data = {
labels: ['Bekerja', 'Melanjutkan', 'Berwirausaha', 'Belum Bekerja'],
datasets: [
{
label: '# of Votes',
data: [2, 1, 0, 0],
backgroundColor: [
'rgba(54, 162, 235, 0.2)',
'rgba(255, 206, 86, 0.2)',
'rgba(75, 192, 192, 0.2)',
'rgba(255, 99, 132, 0.2)',
],
borderColor: [
'rgba(54, 162, 235, 1)',
'rgba(255, 206, 86, 1)',
'rgba(75, 192, 192, 1)',
'rgba(255, 99, 132, 1)',
],
borderWidth: 1,
},
],
};

const StatusChart = () => (
  <>
    <div className="col-md-6">
      <div className="card card-Info">
        <div className="card-header">
          <h3 className="card-title">Presentase Status Alumni Setelah Lulus</h3>
        </div>
        <div className="card-body">
          <Pie data={data} />
        </div>
      </div>
    </div>
  </>
);

export default StatusChart;