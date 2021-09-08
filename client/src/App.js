import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import {UserProvider} from './context/user.context'
import {SignupProvider} from './context/signup.context'
import homePage from './Pages/homePage';
import './app.css'
import LoginPage from './Pages/loginPage';
import SignUpPage from './Pages/signUpPage';
import VerifyPage from './Pages/verifyPage';

  function App() {
    
    return (
      <CookiesProvider>
      <UserProvider>
      <SignupProvider>
        <Router>
          <div className='app'>
            <Switch>
              <Route path='/' exact component={homePage}/>
              <Route path='/login' exact component={LoginPage}/>
              <Route path='/signup' exact component={SignUpPage}/>
              <Route path='/register/verify' exact component={VerifyPage}/>
            </Switch>
          </div>
         </Router>
      </SignupProvider>
      </UserProvider>
      </CookiesProvider>
    );
  }

export default App;
