import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

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
    </Container>
  );
}

export default AdminPanel;
