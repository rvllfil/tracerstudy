import { Route, Switch } from 'react-router'
import LogRoute from './LogRoute'
import AdminRoute from './AdminRoute'
import Login from '../pages/Login'
import Admin from '../pages/Admin'

const Router = () => {
  return (
    <Switch>
      <LogRoute path='/admin/login' comp={Login}/>
      <AdminRoute path='/admin' comp={Admin} />     
    </Switch> 
  )
}


export default Router