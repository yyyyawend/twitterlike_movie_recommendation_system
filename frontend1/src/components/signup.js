import React, { useState, useEffect } from 'react';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
        const user = {
          username: username,
          email: email,
          password: password,
        };

        fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(res => res.json())
          .then(data => {
            if (data.token) {
              localStorage.clear();
              localStorage.setItem('token', data.token);
              localStorage.setItem("userid", data.user.id);
              window.location.replace('http://localhost:3000');
            } else {
              setUsername('');
              setEmail('');
              setPassword('');
              localStorage.clear();
              setErrors(true);
            }
          });
  }

  return (
    <div>
      {loading === false && <h1>Signup</h1>}
      {errors !== false && <h2>Cannot signup with provided credentials</h2>}
      <Container>
      <Form>
      <Form.Group className="mb-3">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={onSubmit}> Sign Up </Button>
      </Form>
      </Container>
    </div>
  );
};

export default Signup;
