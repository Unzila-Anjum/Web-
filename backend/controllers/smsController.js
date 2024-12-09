import axios from 'axios';

export const sendSMS = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    // Ensure phone number is in E.164 format
    const sanitizedNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = sanitizedNumber.startsWith('92') 
      ? sanitizedNumber 
      : `92${sanitizedNumber.slice(-10)}`;

    const payload = {
      from: '447418629185',  // Your Sinch verified number
      to: [formattedNumber],
      body: message
    };

    const response = await axios.post(
      `https://sms.api.sinch.com/xms/v1/${process.env.SINCH_SERVICE_PLAN_ID}/batches`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SINCH_API_TOKEN}`
        }
      }
    );

    res.status(200).json({
      success: true,
      message: 'SMS sent successfully',
      data: response.data
    });
  } catch (error) {
    console.error('SMS Send Error:', error.response?.data || error.message);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send SMS',
      error: error.response?.data || error.message
    });
  }
};