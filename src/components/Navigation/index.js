import React from 'react';
import { Link } from 'react-router-dom';

import { Canvas } from 'mason-library';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavLoggedIn authUser={authUser} />
      ) : (
        <NavLoggedOut />
      )
    }
  </AuthUserContext.Consumer>
);

const NavLoggedIn = ({ authUser }) => (<Canvas id='5ca92a96f1e3fc000332dc7f' />);
const NavLoggedOut = () => (<Canvas id='5c90592d6c1eab0003862eae' />);

export default Navigation;
