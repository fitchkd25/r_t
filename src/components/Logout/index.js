import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { withFirebase } from '../Firebase';

class Logout extends Component {
  componentWillMount() {
    this.props.firebase.doSignOut();
  }

  render() {
    return <Redirect to="/" />
  }
}

export default withFirebase(Logout);
