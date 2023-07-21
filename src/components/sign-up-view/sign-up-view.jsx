import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUpView = (/*{ goToLoginAfterSignUp }*/) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      email: email,
      birthDate: birthday,
    };

    fetch("https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Sign-up successful");
          navigate("/login");
        } else {
          alert("Sign-up failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        Username:
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="6"
          maxLength={"20"}
          className="sign-up-form-control"
        />
      </Form.Group>
      <Form.Group>
        Password:
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </Form.Group>
      <Form.Group>
        Email:
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        Birthday:
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup>
          <Button type="submit">Submit</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Link to={"/login"}>
            <Button>Cancel</Button>
          </Link>
        </ButtonGroup>
      </ButtonToolbar>
    </Form>
  );
};
