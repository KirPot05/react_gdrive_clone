import { useState } from 'react';
import {Card, Button, Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CenteredContainer from './CenteredContainer';

function Profile() {

    const [error, setError] = useState('');
    const {currentUser, logOut} = useAuth();
    let navigate = useNavigate();


    const handleLogOut = async () => {
        setError('');

        try {
            await logOut();
            navigate('/login');
        } catch {
            setError("Error Logging Out");
        }

    }

    return (
        <CenteredContainer>  

            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'> Profile </h2>
                    {error && <Alert variant='danger'>{error}</Alert>}

                    <strong>Email: </strong> {currentUser.email}

                    <Link to="/update-profile" className='btn btn-primary w-100 mt-4'>Update Profile</Link>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogOut}>Log Out</Button>
            </div>
            
        </CenteredContainer>
  )
  
}

export default Profile;