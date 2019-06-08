import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Canvas } from '@mason-api/react-sdk';
import { AuthUserContext } from '../Session';


class Navigation extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
            {authUser =>
            authUser ? (
              <div><NavLoggedIn state={this} /></div>
             ) : (
              <div><NavLoggedOut state={this} /></div>
      )
    }
      </AuthUserContext.Consumer>
    )
  }
}

const NavLoggedIn = ({state}) => (<Canvas
  id="5ca92a96f1e3fc000332dc7f"
  eventHandlers={{
    onClick: (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        state.props.history.push(e.target.getAttribute('href'));
      }
    }
 }} 
 />);
const NavLoggedOut = ({state}) => (<Canvas
  id="5c90592d6c1eab0003862eae"
  eventHandlers={{
    onClick: (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        state.props.history.push(e.target.getAttribute('href'));
      }
    }
 }} 
 />);

export default withRouter(Navigation);