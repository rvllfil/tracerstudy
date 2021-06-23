import { Route, Switch } from 'react-router'
import LogRoute from './LogRoute'
import AdminRoute from './AdminRoute'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import Alumni from '../pages/admin/Alumni'


const Router = () => {
  return (
    <Switch>
      <LogRoute path='/admin/login' comp={Login}/>
      <AdminRoute exact path='/admin' comp={Admin} />
      <AdminRoute path='/admin/alumni' comp={Alumni} />     
    </Switch> 
  )
}


export default Router