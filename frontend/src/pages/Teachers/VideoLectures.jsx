import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  VideoLecturesPageContainer,
  SidebarContainer,
  MainContent,
  LecturesList,
  Lecture,
  UploadForm,
  FileInput,
  UploadButton,
  ErrorText,
  DeleteButton,
} from '../../styles/VideoLecturesStyles';

const VideoLectures = () => {
  const [videoLectures, setVideoLectures] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch video lectures
  const fetchVideoLectures = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/upload/getall');
      setVideoLectures(response.data.lectures || []);
    } catch (error) {
      console.error('Error fetching video lectures:', error);
      setError('Error fetching video lectures');
    }
  };

  useEffect(() => {
    fetchVideoLectures();
  }, []);

  // Function to upload a new video lecture
  const uploadVideoLecture = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:4000/api/v1/upload/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setVideoLectures([...videoLectures, response.data.lecture]);
      setSelectedFile(null);
      setError(null);
    } catch (error) {
      console.error('Error uploading video lecture:', error);
      setError('Error uploading video lecture');
    }
  };

  // Function to delete a video lecture
  const deleteVideoLecture = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/upload/delete/${id}`);
      setVideoLectures(videoLectures.filter((lecture) => lecture._id !== id));
      console.log(response.data.message); // Logs success message
    } catch (error) {
      console.error('Error deleting video lecture:', error);
      setError('Error deleting video lecture');
    }
  };

  return (
    <VideoLecturesPageContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent>
        <h1>Video Lectures</h1>
        <UploadForm onSubmit={uploadVideoLecture}>
          <h2>Upload New Video Lecture</h2>
          <FileInput type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <UploadButton type="submit">Upload</UploadButton>
        </UploadForm>
        {error && <ErrorText>{error}</ErrorText>}
        <LecturesList>
          <h2>Uploaded Video Lectures</h2>
          {videoLectures.map((lecture) => (
            <Lecture key={lecture._id}>
              <a
                href={`http://localhost:4000/upload/upload/${lecture.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {lecture.fileName}
              </a>
              <DeleteButton onClick={() => deleteVideoLecture(lecture._id)}>Delete</DeleteButton>
            </Lecture>
          ))}
        </LecturesList>
      </MainContent>
    </VideoLecturesPageContainer>
  );
};

export default VideoLectures;
