const styles = {
  courseManagement: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'row',
  },
  container: {
    display: 'flex',
    width: '100%',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    position: 'fixed',
    height: '100vh',
    top: '0',
    left: '0',
  },
  mainContent: {
    marginLeft: '250px', // Push content to the right of the sidebar
    padding: '20px',
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
  searchAndButton: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  searchInput: {
    width: '70%',
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  addCourseButton: {
    padding: '8px 15px',
    backgroundColor: '#007bff', // Blue color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  formHeading: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff', // Blue color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#007bff', // Blue color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  saveButton: {
    padding: '8px 15px',
    backgroundColor: '#007bff', // Blue color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '8px 15px',
    backgroundColor: '#007bff', // Blue color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default styles;
