import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function Login({ apiUrl }) {
  const notyf = new Notyf();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();

    fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem('token', data.access);
          retrieveUserDetails(data.access);
          setEmail('');
          setPassword('');
          notyf.success('Successful Login');
        } else if (data.message === 'Incorrect email or password') {
          notyf.error('Incorrect Credentials. Try Again');
        } else {
          notyf.error(`${email} does not exist. Try Again.`);
        }
      })
      .catch(() => {
        notyf.error('An error occurred. Please try again.');
      });
  }

  function retrieveUserDetails(token) {
    fetch(`${apiUrl}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ id: data.user._id });
      })
      .catch(() => {
        notyf.error('Failed to retrieve user details.');
      });
  }

  useEffect(() => {
    setIsActive(email !== '' && password !== '');
  }, [email, password]);

  if (user.id) {
    return <Navigate to="/workouts" />;
  }

  return (
    <Form onSubmit={authenticate}>
      <h1 className="my-5 text-center">Login</h1>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant={isActive ? 'primary' : 'danger'}
        type="submit"
        id="loginBtn"
        disabled={!isActive}
      >
        Login
      </Button>

      <p className="mt-3">
        No account yet? <Link to="/register">Click here to register!</Link>
      </p>
    </Form>
  );
}
