
export const deleteChatGptSession = async (email: string, token: string, session_id: string) => {
    try {
      const response = await fetch('/api/aika-delete-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, session_id }),
      });
  
      if (!response.ok) {
        throw new Error('Session delete failed.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };