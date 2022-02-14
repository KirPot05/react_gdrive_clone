import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from '../CenteredContainer';

function Login() {

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const { login } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');

        } catch(e) {
            console.log(e);
            setError("Failed to sign in");
        }

        setLoading(false);
  };

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>

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

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
        </Form>

		<div className="w-100 text-center mt-3">
			<Link to="/forgot-password"> Forgot Password? </Link>
		</div>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup"> Sign Up </Link>
      </div>
    </CenteredContainer>
  );
}

export default Login;
