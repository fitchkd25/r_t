import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Canvas } from '@mason-api/react-sdk';
import _ from 'lodash';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

class CreateOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    this.props.firebase
    .doCreateUserWithEmailAndPassword(data.email, data.password)
    .then(authUser => {
      const userDomain = data.email.match(/@(\w+)/)[1];

      this.props.firebase
      .once('value', snapshot => {
          // First, see if any domain already exists that matches the user domain
          const domainsObject = snapshot.val();
          const domainsList = Object.keys(domainsObject).map(key => ({
            ...domainsObject[key],
          uid: key,
        }));
        const existingDomain = _.find(domainsList, (d) => d.name === userDomain);

          // If no match, create a new domain
          const newDomain = this.props.firebase.domains().push({
            name: userDomain,
            users: { [authUser.user.uid]: true }
          })
          .then(snap => {
            this.props.firebase.user(authUser.user.uid).set({
              name: data.name,
              email: data.email,
              domain: snap.key
            })
          })
      })
    })
    .then(() => {
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({ error: error.message })
    });
  }

  render() {
    return (
      <div>
        <Canvas
          id="5cd3826ded24bd00030718f9"
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
)(CreateOrganization);
