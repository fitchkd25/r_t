import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    this.props.firebase
      .doSignInWithEmailAndPassword(data.email, data.password)
      .then(() => { this.props.history.push(ROUTES.HOME) })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return('signin');
  }
}

export default compose(
  withRouter,
  withFirebase,
)(SignIn);
