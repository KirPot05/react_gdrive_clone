import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from '../CenteredContainer';

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signUp } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      navigate('/');

    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label> Email </Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label> Password </Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label> Confirm Password </Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              {" "}
              Sign Up{" "}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to='/login'> Log In </Link>
      </div>
    </CenteredContainer>
  );
}

export default SignUp;
