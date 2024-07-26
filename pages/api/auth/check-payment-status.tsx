import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the request method is POST
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, token } = req.body;
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch(`${process.env.BASE_URL}/v1/profile/profile-details/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Token ${token}`,
      }
    });
    if (!response.ok) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const resultJson = await response.json();
    const isPaid = resultJson.paid_user;

    res.setHeader('Set-Cookie', [
      `isPaid=${isPaid}; HttpOnly; Max-Age=${60 * 60 * 24}; Path=/; Secure`
    ]);

    res.status(200).json({ isPaid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking payment status' });
  }
}

export default handler;
