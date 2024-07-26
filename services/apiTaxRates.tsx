
export const apiTaxRates = async (token: string) => {
    try {
      const response = await fetch('/api/api-tax-rates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        throw new Error('Document count has an issue.');
      }
  
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error('Error during getting the document count:', error);
      throw error;
    }
  };