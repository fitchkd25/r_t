import React, { Component } from 'react';
import _ from 'lodash';
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
} from '../Session';

import { withFirebase } from '../Firebase';

class Account extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
     'account'
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(Account);
