
export const updateSessionTitle = async (email: string, token: string, session_id: string,
    session_title: string) => {
    try {
      const response = await fetch('/api/aika-change-session-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, session_id, session_title }),
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