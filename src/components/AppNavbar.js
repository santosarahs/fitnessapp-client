import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {


  const {user} = useContext(UserContext);

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
      <Container className="ms-0">
        <Navbar.Brand as={NavLink} to="/">StellaFit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

          {!user.id && (
              <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
            )}

            {(user.id)?
                  <>
                      <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
                      <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                  </>
              :
              <>
                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
              </>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
	)
}