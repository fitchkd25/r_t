import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Canvas } from '@mason-api/react-sdk';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class CreateVendor extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {

    let vendorRequestData = {
      name : data.vendorName
    };
    if(data.notes == null) {
      data.notes = '';
    }
    this.props.firebase
      .doCreateVendor(vendorRequestData)
      .then(() => {
        this.props.history.push(ROUTES.VENDORS);
      })
      .catch(error => {
        this.setState({ error: error.message })
      });

  }

  render() {
    return (
      <div>
        <Canvas
          id="5cd381d7ed24bd00030718e1"
          children={<span>{this.state.error}</span>}
          willSendData={(form) => {
            this.onSubmit(form.data)
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
)(CreateVendor);
