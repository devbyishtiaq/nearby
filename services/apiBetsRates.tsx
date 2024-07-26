
export const apiBetsRates = async (token: string) => {
    try {
      const response = await fetch('/api/api-bets-rates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        throw new Error('Bets rates has an issue.');
      }
  
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error('Error during getting Bets rates:', error);
      throw error;
    }
  };