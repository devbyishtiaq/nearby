
export const legislationPopularArticles = async (token: string) => {
    try {
      const response = await fetch('/api/legislation-popular-articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        throw new Error('Popular articles has an issue.');
      }
  
      const data = await response.json();
      return data.popular_articles;
    } catch (error) {
      console.error('Error during getting popular articles:', error);
      throw error;
    }
  };