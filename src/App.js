import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Detail from './containers/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/detail/:movie_id' component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
