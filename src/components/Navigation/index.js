import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Canvas } from 'mason-library';
import { AuthUserContext } from '../Session';


class Navigation extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <Canvas
              id="5ca92a96f1e3fc000332dc7f"
              eventHandlers={{
                onNavLinkClick: (e) => {
                    e.preventDefault();
                    this.props.history.push(e.target.getAttribute('href'));
                }
             }} 
             />
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

export default withRouter(Navigation);
