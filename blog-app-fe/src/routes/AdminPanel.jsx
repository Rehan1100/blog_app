// AdminPanel.js
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import CreateBlog from '../components/CreateBlog'; // Import the CreateBlog component
import CreateCategory from '../components/CreateCategory'; // Import the CreateBlog component

function AdminPanel() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT token from local storage
    logout(); // Update auth context
    navigate('/'); // Redirect to landing page
  };

  return (
    <Container>
      <h2 className="mt-4">Admin Panel</h2>
      <Button variant="primary" onClick={handleLogout}>Logout</Button>

      <CreateBlog /> 
      {/* Include the CreateBlog component */}
      <CreateCategory/>
    </Container>
  );
}

export default AdminPanel;
