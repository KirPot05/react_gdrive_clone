import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from '../CenteredContainer';

function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage('');
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for instructions');

        } catch(e) {
            console.log(e);
            setError("Failed to reset password");
        }

        setLoading(false);
  };

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {message && <Alert variant="success">{message}</Alert>}
    
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                <Form.Label> Email </Form.Label>
                <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Button disabled={loading} className="w-100 mt-3" type="submit">
                Reset Password 
                </Button>
            </Form>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need to Log In?  <Link to="/login"> Login </Link>
      </div>
    </CenteredContainer>
  );
}

export default ForgotPassword;
