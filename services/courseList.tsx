
export const courseList = async (email: string, token: string, searchType: string) => {
    try {

      const response = await fetch(`/api/courses-get-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, searchType }),
      });
      if (!response.ok) {
        throw new Error('Second folder not found.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Second folder not found: ', error);
      throw error;
    }
  };