import { Navbar, Container, Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="navigation-bar mb-5" fixed="top" expand="md">
      <Container>
        <Navbar.Brand className="navigation-bar" as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/sign-up">
                  Sign-up
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <NavDropdown
                  title={user.Username} /*id="collasible-nav-dropdown"*/
                >
                  <NavDropdown.Item as={Link} to="/user">
                    User profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user">
                    Favorite movies
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
