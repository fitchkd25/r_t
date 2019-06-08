import React, { Component } from 'react';
import _ from 'lodash';
import { Canvas } from '@mason-api/react-sdk';
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
          <div>
            <Canvas
              willFetchData={(form) => {
                if (form.name === 'Current User Profile') {
                  const newURL = _.replace(form.url, ':currentUserId', authUser.uid);
                  return {
                    ...form,
                    url: newURL
                  }
                }
                if (form.name === 'Current User Domain') {
                  const newURL = _.replace(form.url, ':currentDomain', authUser.domain);
                  return {
                    ...form,
                    url: newURL
                  }
                }
              }}
              id="5c9d20cb1df9830003f1d149" /> {/* User profile card */}
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(Account);
