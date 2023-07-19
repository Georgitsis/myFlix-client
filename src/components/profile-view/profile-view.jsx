import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./profile-view.scss";
import { InputGroup } from "react-bootstrap";

export const ProfileView = ({ user, token, onLoggedOut }) => {
  const [initialUsername, setInitialUsername] = useState(user.Username);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthDate.slice(0, 10));

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { Username: username };
    /*const data = {
      Username: username,
      Password: password,
      email: email,
      birthDate: birthday,
    };*/
    fetch(
      `https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/users/update/${initialUsername}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Sign-up successful");
        } else {
          alert("Sign-up failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeregister = () => {
    fetch(
      `https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/users/${initialUsername}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          onLoggedOut();
          alert("De-registration successful");
        } else {
          alert("De-registration failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Form /*onSubmit={handleSubmit}*/>
      <Form.Group>
        <div className="mb-2">Username:</div>
        <InputGroup className="mb-3">
          <Form.Control
            className="sign-up-form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="6"
            maxLength={"20"}
          />
          <Button onClick={handleSubmit} className="profile-view-update-btn">
            &#128472;
          </Button>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <div className="mb-2">Password:</div>
        <InputGroup className="mb-3">
          <Form.Control
            className="sign-up-form-control"
            type="password"
            placeholder="Type in old or new password"
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <Button type="submit" className="profile-view-update-btn">
            &#128472;
          </Button>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <div className="mb-2">Email:</div>
        <InputGroup className="mb-3">
          <Form.Control
            className="sign-up-form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="profile-view-update-btn">
            &#128472;
          </Button>
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <div className="mb-2">Birthday:</div>
        <InputGroup className="mb-3">
          <Form.Control
            className="sign-up-form-control"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
          <Button type="submit" className="profile-view-update-btn">
            &#128472;
          </Button>
        </InputGroup>
      </Form.Group>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup>
          <Button onClick={handleDeregister}>Deregister</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Link to={"/"}>
            <Button>Cancel</Button>
          </Link>
        </ButtonGroup>
      </ButtonToolbar>
    </Form>
  );
};
