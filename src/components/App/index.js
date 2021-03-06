import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AccountPage from '../Account';
import Footer from '../Footer';
import HomePage from '../Home';
import LandingPage from '../Landing';
import Logout from '../Logout';
import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import CreateCallLog from '../CreateCallLog';
import CreateProduct from '../CreateProduct';
import CreateOrganization from '../CreateOrganization';
import CreateForm from '../CreateForm';
import CreateField from '../CreateField';
import CreateUser from '../CreateUser';
import CallLogs from '../CallLogs';





import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { config } from '@fortawesome/fontawesome-svg-core';
import { app } from 'firebase';

class App extends Component {
  componentDidMount() {
    
    /*Mason({
      apiKey: 'FGvtU/I0YKolZPi6LSOAOv2TZAN1GEHV4NuJWjgrzFQ=',
      projectId: '5c9037846c1eab0003862bd6'
    });*/
  }
  // Lb9N/3VwCpKIjIyHnrc4efAJPHjXCO1SmUnhyoZCrU4=
  // 5c9037846c1eab0003862bd6

  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_OUT} component={Logout} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.CREATE_USER} component={CreateUser} />
          <Route path={ROUTES.CREATE_CALL_LOG} component={CreateCallLog} />
          <Route path={ROUTES.CREATE_PRODUCT} component={CreateProduct} />
          <Route path={ROUTES.CREATE_ORGANIZATION} component={CreateOrganization} />
          <Route path={ROUTES.CREATE_FORM} component={CreateForm} />
          <Route path={ROUTES.CREATE_FIELD} component={CreateField} />
          <Route path={ROUTES.CALL_LOGS} component={CallLogs} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App);
