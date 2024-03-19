import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../constants/userConstants'
function Header() {
 

  const userLogin = useSelector( state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const logoutHandler = ()=>{
    dispatch(logout())
    navigate('/')

  }
  return (
    <header>
      <Navbar bg="success" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >H</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">

            <LinkContainer to = '/cart'>
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
              </LinkContainer>

            { userInfo ? (
              <NavDropdown title={userInfo.name} id ='username'> 
              <LinkContainer to ='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler }>Logout</NavDropdown.Item>


              </NavDropdown>
            ):
            ( 
              <>
            <LinkContainer to = '/login'>
              <Nav.Link >
                <i className="fas fa-user"></i>Login
              </Nav.Link>
              </LinkContainer>
{/*               
              <LinkContainer to = '/register'>
              <Nav.Link >
                <i className="fas fa-user"></i>Register
              </Nav.Link>
              </LinkContainer> */}
              </>

              
            )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

//rfce
