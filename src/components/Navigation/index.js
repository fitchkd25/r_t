import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { Button, FormControl, Nav, Navbar, Form } from 'react-bootstrap';


class Navigation extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
            {authUser =>
            authUser ? (
              <div><NavLoggedIn state={this} /></div>
             ) : (
              <Navbar bg="light" variant="light">
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </Navbar>
      )
    }
      </AuthUserContext.Consumer>
    )
  }
}

const NavLoggedIn = ({state}) => ('nav in')

const NavLoggedOut = ({state}) => (<iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNWMxMjYzNmUtNzdjOC00OWIwLWFkMjAtYjY0ZDE1ODdjY2NiIiwidCI6IjZmZjJmMjc5LTc4ZWYtNDE4Ni04Y2NlLTg2ZWZkZTVlNjRkZCJ9" frameborder="0" allowFullScreen="true"></iframe>)





export default withRouter(Navigation);