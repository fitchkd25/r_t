import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Canvas } from 'mason-library';

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
    return (
      <div>
        <Canvas
          id="5cab324147fe490003907e8b"
          children={<span>{this.state.error}</span>}
          willSendData={(form) => {
            this.onSubmit(form.data);
            return false; // Don't actually submit the form
          }}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  withFirebase,
)(SignIn);
