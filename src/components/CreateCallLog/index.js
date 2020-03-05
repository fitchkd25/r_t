import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class CreateCallLog extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    if (data.takeaways == null) {
      data.takeaways = '';
    }
    let callLogRequestData = {
      objective : data.objective,
      customer : data.customer,
      takeaways : data.takeaways
    }
    this.props.firebase
      .doCreateCallLog(callLogRequestData)
      .then(() => {
        this.props.history.push(ROUTES.CALL_LOGS);
      })
      .catch(error => {
        this.setState({ error: error.message })
      });

  }

  render() {
    return (
    'createcalllog'
    );
  }
}

export default compose(
  withRouter,
  withFirebase,
)(CreateCallLog);
