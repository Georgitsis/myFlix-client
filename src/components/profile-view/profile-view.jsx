import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export const ProfileView = ({ user, token }) => {
  const [oldUsername, setOldUsername] = useState(user.Username);
  console.log(oldUsername);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthDate.slice(0, 10));

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      email: email,
      birthDate: birthday,
    };
    console.log(oldUsername);
    fetch(
      `https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/users/update/${oldUsername}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      console.log(response);
      if (response.ok) {
        alert("Signup successful");
      } else {
        alert("Signup failed");
      }
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
        />
      </Form.Group>
      <Form.Group>
        Password:
        <Form.Control
          type="password"
          //value={password}
          placeholder="Type in old or new password"
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
          //type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup>
          <Button type="submit">Update user data</Button>
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
