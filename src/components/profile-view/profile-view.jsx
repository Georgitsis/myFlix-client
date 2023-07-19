import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./profile-view.scss";

export const ProfileView = ({ user, token, onLoggedOut }) => {
  const [initialUsername, setInitialUsername] = useState(user.Username);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthDate.slice(0, 10));

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      email: email,
      birthDate: birthday,
    };
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
          alert("User update successful");
        } else {
          alert("User update failed");
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
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <div className="mb-1">Username:</div>
          <Form.Control
            className="sign-up-form-control mb-3"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={"6"}
            maxLength={"20"}
          />
        </Form.Group>

        <Form.Group>
          <div className="mb-1">Email:</div>
          <Form.Control
            className="sign-up-form-control mb-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <div className="mb-1">Birthday:</div>
          <Form.Control
            className="sign-up-form-control mb-3"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup>
            <Button type="submit">Update user</Button>
          </ButtonGroup>

          <ButtonGroup></ButtonGroup>
        </ButtonToolbar>
      </Form>
      <Form className="mt-5">
        <Form.Group>
          <div className="mb-1">Old password:</div>
          <Form.Control
            className="sign-up-form-control mb-3"
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            //required
            minLength={8}
          />
        </Form.Group>
        <Form.Group>
          <div className="mb-1">New password:</div>
          <Form.Control
            className="sign-up-form-control mb-3"
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            //required
            minLength={8}
          />
        </Form.Group>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup>
            <Button>Update password</Button>
          </ButtonGroup>

          <ButtonGroup></ButtonGroup>
        </ButtonToolbar>
      </Form>
      <div className="mt-5">De-register User</div>
      <Button onClick={handleDeregister}>Deregister</Button>
    </>
  );
};
