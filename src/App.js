import SignUp from "./components/auth/SignUp";
import Login from "./components/auth//Login";
import Profile from "./components/Profile";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from "./components/auth/ForgotPassword";
import UpdateProfile from "./components/auth/UpdateProfile";
import PrivateRoute from "./components/auth/PrivateRoute"; 
import Dashboard from "./components/drive_components/Dashboard";

function App() {


	return (

			<BrowserRouter>
				<AuthProvider>
					<Routes>
						
						{/* Drive */}
						<Route exact path="/" element={<PrivateRoute> <Dashboard/> </PrivateRoute>}/>
						<Route exact path="/folder/:folderId" element={<PrivateRoute> <Dashboard/> </PrivateRoute>}/>


						{/* Profile */}
						<Route exact path="/signup" element={<SignUp />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/forgot-password" element={<PrivateRoute> <ForgotPassword /> </PrivateRoute>} />
						

						{/* Authentication */}
						<Route exact path="/user" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
						<Route exact path="/update-profile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
	);
}

export default App;
