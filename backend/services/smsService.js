import { Vonage } from '@vonage/server-sdk';
import { config } from '../config/index.js';

const vonage = new Vonage({
  apiKey: config.vonageApiKey,
  apiSecret: config.vonageApiSecret
});

export const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await vonage.sms.send({
      from: config.vonageBrandName,
      to: phoneNumber,
      text: message
    });

    // Check if message was sent successfully
    const responseData = response.messages[0];
    if (responseData.status === '0') {
      return {
        success: true,
        messageId: responseData['message-id'],
        remainingBalance: responseData['remaining-balance']
      };
    } else {
      throw new Error(`Failed to send SMS: ${responseData['error-text']}`);
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to send SMS');
  }
};