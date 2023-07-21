import { Navbar, Container, Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, updateSearchItem }) => {
  const navigate = useNavigate();
  let searchItem = null;
  return (
    <Navbar className="navigation-bar mb-5" fixed="top" expand="md">
      <Container>
        <Navbar.Brand className="navigation-bar" as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && (
            <>
              <Form.Control
                type="text"
                placeholder="Search for a movie title"
                className="me-2 search-field"
                aria-label="Search"
                onChange={(e) => (searchItem = e.target.value)}
              />
              <Button
                onClick={() => {
                  updateSearchItem(searchItem);
                  navigate(`/search/${searchItem}`);
                }}
                className="search-field-button"
              >
                Search
              </Button>
            </>
          )}

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
                <NavDropdown title={user.Username}>
                  <NavDropdown.Item as={Link} to="/user">
                    User profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/favorites">
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
