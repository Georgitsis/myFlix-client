import { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Link } from "react-router-dom";
export const LoginView = ({ onLoggedIn, onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
    fetch(
      `https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/login?Username=${username}&Password=${password}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user.Username, data.token);
        } else alert(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={6}
            maxLength={20}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Link to={"/sign-up"}>
              <Button>Sign Up</Button>
            </Link>
          </ButtonGroup>
        </ButtonToolbar>
      </Form>
    </>
  );
};
