export const getCounterparty = async (user_type:string, iibn:string, demand_url:string) => {
    try {
      const response = await fetch('/api/get-counterparty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_type, iibn, demand_url }),
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