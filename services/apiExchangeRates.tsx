
export const apiExchangeRates = async (token: string) => {
    try {
      const response = await fetch('/api/api-exchange-rates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        throw new Error('Exchange rates has an issue.');
      }
  
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error('Error during getting exchange rates:', error);
      throw error;
    }
  };