import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { Provider } from 'react-redux';
import store from './redux/store'
import { loadAdmin } from './redux/actions/authAction'
import { useEffect } from 'react'

function App() {
  const user = store.dispatch(loadAdmin())
  useEffect(() => {
    return () => {
      store.dispatch(loadAdmin())
    }
  },[user])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
