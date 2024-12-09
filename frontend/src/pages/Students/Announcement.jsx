// AnnouncementSection.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AnnouncementContainer,
  SidebarContainer,
  Content,
  AnnouncementHeader,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementTitle,
  AnnouncementContent,
  AnnouncementCard,
} from '../../styles/AnnouncementStyles'; 

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <AnnouncementContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <AnnouncementHeader>Announcements</AnnouncementHeader>
        <AnnouncementCard>
          {announcements.map((announcement) => (
            <AnnouncementItem key={announcement._id}>
              <AnnouncementTitle>{announcement.announcement}</AnnouncementTitle>
            </AnnouncementItem>
          ))}</AnnouncementCard>
        
      </Content>
    </AnnouncementContainer>
  );
};

export default AnnouncementSection;
