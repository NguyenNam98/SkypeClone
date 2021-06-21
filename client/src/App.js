import {ConfigProvider } from 'react-avatar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import homePage from './Pages/homePage';
import './app.css'
  function App() {
    const configAvatar = {
    }
    return (
      <ConfigProvider {...configAvatar}>
        <Router>
          <div className='app'>
            <Switch>
              <Route path='/' exact component={homePage}/>
            </Switch>
          </div>
         </Router>
      </ConfigProvider>
    );
  }

export default App;
