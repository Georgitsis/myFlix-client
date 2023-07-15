import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export const ProfileView = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      email: email,
      birthDate: birthday,
    };
    //console.log(data);
    fetch("https://fierce-meadow-39793-bd539c2b94d7.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        offSignUp(false);
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };
  return (
    <Form /*onSubmit={handleSubmit}*/>
      <Form.Group>
        Username:
        <Form.Control
          type="text"
          value={user.Username}
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
          value={user.Password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </Form.Group>
      <Form.Group>
        Email:
        <Form.Control
          type="email"
          value={user.email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        Birthday:
        <Form.Control
          //type="date"
          value={user.birthDate.slice(0, 10)}
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
