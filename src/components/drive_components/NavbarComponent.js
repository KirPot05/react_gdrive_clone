import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function NavbarComponent() {
	return (
		<Navbar bg="light" expand="sm">
			<Navbar.Brand className='px-2' as={Link} to="/">
				Apna Drive
			</Navbar.Brand>

			<Nav>
				<Nav.Link as={Link} to="/user" >
					Profile
				</Nav.Link>
			</Nav>
		</Navbar>
	)
}

export default NavbarComponent;