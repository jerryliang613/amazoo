import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  useEffect(() => {
    return () => {
      localStorage.clear();
    }
  }, [])
  return (
    <Router>
      <div className="app">

        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/products/:id' >
            <Header />
            <ProductDetail />
          </Route>
          <Route path='/' >
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
