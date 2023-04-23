import './App.css';
import Dash from './componentes/Dash';
import {BrowserRouter, Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component = {Dash}></Route>
        </Switch>
      </BrowserRouter>      
    </div>
  );
}

export default App;
