import {ConfigProvider } from 'react-avatar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import leftFunc from './Pages/leftFunc';

  function App() {
    const configAvatar = {

    }
    return (
      <ConfigProvider {...configAvatar}>
        <Router>
          <div className='App'>
            <Switch>
              <Route path='/' exact component={leftFunc}/>
            </Switch>
          </div>
         </Router>
      </ConfigProvider>
    );
  }

export default App;
