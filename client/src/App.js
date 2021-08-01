import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {UserProvider} from './context/user.context'
import homePage from './Pages/homePage';
import './app.css'
import LoginPage from './Pages/loginPage';
import SignUpPage from './Pages/signUpPage';

  function App() {
    
    return (
      <UserProvider>
        <Router>
          <div className='app'>
            <Switch>
              <Route path='/' exact component={homePage}/>
              <Route path='/login' exact component={LoginPage}/>
              <Route path='/signup' exact component={SignUpPage}/>
            </Switch>
          </div>
         </Router>
      </UserProvider>
    );
  }

export default App;
