
export const sendContactMessage = async (username: string, email: string, phone: string,
    message_content: string, message_type: string, locale: string) => {
    try {
      const response = await fetch('/api/send-contact-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone, message_content, message_type, locale }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };