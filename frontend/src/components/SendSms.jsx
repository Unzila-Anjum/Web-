// SendSms.jsx
import React, { useState } from 'react';
import axios from 'axios';
import{AnnouncementContainer,
  SidebarContainer,
  Content,
  AnnouncementHeader,
  AnnouncementCard,} from '../styles/AnnouncementStyles';
  import Sidebar from '../pages/Admin/Sidebar';
const SendSms = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const response = await axios.post('http://localhost:4000/send-sms', {
        
      });

      if (response.data.success) {
        setStatus('SMS sent successfully!');
      } else {
        setStatus('Failed to send SMS');
      }
    } catch (error) {
      setStatus('Failed to send SMS');
    }
  };

  return (<AnnouncementContainer>
    <SidebarContainer>
      <Sidebar />
    </SidebarContainer>
    <Content>
      <AnnouncementHeader>Reschedule Class</AnnouncementHeader>
      <AnnouncementCard>
    <div>
      <h2>Send SMS</h2>
      <form onSubmit={handleSubmit}>
        
        <button type="submit">Send SMS</button>
      </form>
      {status && <p>{status}</p>}
    </div></AnnouncementCard></Content></AnnouncementContainer>
  );
};

export default SendSms;
