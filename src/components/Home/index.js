import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { StreamApp, FlatFeed } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

    render() {
      return(
        <StreamApp
          apiKey="wzty4shbuqbn"
          appId="50683"
          token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.qaediIXzt-cGiPP_istWeMEgEJ9HTy13Tn2VgXmpzks"
        >
          <FlatFeed
            notify
          />
        </StreamApp>
      );
    }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);

// https://firestore.googleapis.com/v1/projects/roadmap-tools-release/databases/(default)/documents/vendors/VSYLoJdu0epacBDJ8t9w