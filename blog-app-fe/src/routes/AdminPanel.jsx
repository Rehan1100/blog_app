// AdminPanel.js
import { Dropdown, Container, DropdownButton } from 'react-bootstrap';
import CreateBlog from '../components/CreateBlog'; // Import the CreateBlog component
import CreateCategory from '../components/CreateCategory'; // Import the CreateBlog component
import { useState } from 'react';

function AdminPanel() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };
  return (
    <Container>
    <h2 className="mt-4">Admin Panel</h2>

    <DropdownButton
      id="dropdown-basic-button"
      title="Select Action"
      onSelect={handleSelect}
      className="mb-4"
    >
      <Dropdown.Item eventKey="createBlog">Create Blog</Dropdown.Item>
      <Dropdown.Item eventKey="createCategory">Create Category</Dropdown.Item>
    </DropdownButton>

    {selectedOption === 'createBlog' && <CreateBlog />}
    {selectedOption === 'createCategory' && <CreateCategory />}
  </Container>
  );
}

export default AdminPanel;
