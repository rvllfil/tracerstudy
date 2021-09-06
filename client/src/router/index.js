import { Route, Switch } from 'react-router'
import LogRoute from './LogRoute'
import AdminRoute from './AdminRoute'
import Login from '../pages/Login'
import Admin from '../pages/admin/Dashboard'
import Alumni from '../pages/admin/Alumni'
import Home from '../pages/Home'
import DataAlumni from '../pages/DataAlumni'
import TracerStudy from '../pages/TracerStudy'
import Kuesioner from '../pages/Kuesioner'
import Masuk from '../pages/Masuk'
import DataTracer from '../pages/admin/TracerStudy'
import Loker from '../pages/admin/Loker'
import Pelatihan from '../pages/admin/Pelatihan'
import PrivateRoute from './PrivateRoute'
import InfoLoker from '../pages/Loker'
import InfoPelatihan from '../pages/InfoPelatihan'


const Router = () => {
  return (
    <Switch>
      <LogRoute path='/admin/login' comp={Login}/>
      <Route path='/login' component={Masuk} />
      <AdminRoute exact path='/admin' comp={Admin} />
      <AdminRoute path='/admin/alumni' comp={Alumni} />
      <AdminRoute path='/admin/tracer-study' comp={DataTracer} />
      <AdminRoute path='/admin/loker' comp={Loker} />
      <AdminRoute path='/admin/Pelatihan' comp={Pelatihan} />

      <PrivateRoute path='/tracer-study' comp={TracerStudy} />
      <PrivateRoute path='/tracer-study/kuesioner' comp={Kuesioner} />
      
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/data-alumni'>
        <DataAlumni />
      </Route>
      <Route path="/loker">
        <InfoLoker />  
      </Route>     
      <Route path='/pelatihan'>
        <InfoPelatihan />  
      </Route>     
    </Switch> 
  )
}


export default Router