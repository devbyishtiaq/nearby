
export const legislationLastArticles = async (token: string) => {
    try {
      const response = await fetch('/api/legislation-last-articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        throw new Error('Last articles has an issue.');
      }
  
      const data = await response.json();
      return data.last_law_articles;
    } catch (error) {
      console.error('Error during getting last articles:', error);
      throw error;
    }
  };