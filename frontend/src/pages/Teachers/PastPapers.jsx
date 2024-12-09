import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  PastPapersPageContainer,
  SidebarContainer,
  MainContent,
  PapersList,
  Paper,
  UploadForm,
  FileInput,
  UploadButton,
  ErrorText,
  DeleteButton,
} from '../../styles/PastPapersStyles';

const PastPapers = () => {
  const [pastPapers, setPastPapers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch past papers from the backend
  const fetchPastPapers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/pastpapers/getall');
      setPastPapers(response.data.papers || []);
    } catch (error) {
      console.error('Error fetching past papers:', error);
      setError('Error fetching past papers');
    }
  };

  useEffect(() => {
    fetchPastPapers();
  }, []);

  // Function to upload a new past paper
  const uploadPastPaper = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:4000/api/v1/pastpapers/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPastPapers([...pastPapers, response.data.paper]);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading past paper:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error uploading past paper');
      }
    }
  };

  // Function to delete a past paper
  const deletePastPaper = async (filePath) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/pastpapers/delete`, {
        data: { filePath },
      });
      setPastPapers(pastPapers.filter((paper) => paper.filePath !== filePath));
    } catch (error) {
      console.error('Error deleting past paper:', error);
      setError('Error deleting past paper');
    }
  };

  return (
    <PastPapersPageContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent>
        <h1>Past Papers</h1>
        <UploadForm onSubmit={uploadPastPaper}>
          <h2>Upload New Past Paper</h2>
          <FileInput type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <UploadButton type="submit">Upload</UploadButton>
        </UploadForm>
        {error && <ErrorText>{error}</ErrorText>}
        <PapersList>
          <h2>Uploaded Past Papers</h2>
          {pastPapers.map((paper, index) => (
            <Paper key={index}>
              <a href={`http://localhost:4000/uploads/${paper.filePath}`} target="_blank" rel="noopener noreferrer">
                {paper.fileName}
              </a>
              <DeleteButton onClick={() => deletePastPaper(paper.filePath)}>Delete</DeleteButton>
            </Paper>
          ))}
        </PapersList>
      </MainContent>
    </PastPapersPageContainer>
  );
};

export default PastPapers;
