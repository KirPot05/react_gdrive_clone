import { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from '../CenteredContainer';

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { UpdateEmail, UpdatePassword, currentUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return setError("Passwords do not match");
        }

        const promises = [];
        setError("");
        setLoading(true);


        if(emailRef.current.value !== currentUser.email){
            promises.push(UpdateEmail(emailRef.current.value))
        } 

        if(passwordRef.current.value){
            promises.push(UpdatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            navigate('/user');
        }).catch(() => {
            setError("Failed to update profile");
        }).finally(()=> {
            setLoading(false);
        })

    }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label> Email </Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label> Password </Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label> Confirm Password </Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep the same" />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to='/user'> Cancel </Link>
      </div>
    </CenteredContainer>
  );
}

export default UpdateProfile;
