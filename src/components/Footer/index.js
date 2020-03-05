
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { Container,Navbar,NavbarBrand } from 'react-bootstrap';


class Footer extends Component {
  render() {
    return (
        <div className="fixed-bottom">  
            <Navbar bg="light" variant="light">
                <Container>
                    <NavbarBrand>Footer</NavbarBrand>
                </Container>
            </Navbar>
        </div>
      )
    }
  }

export default Footer;