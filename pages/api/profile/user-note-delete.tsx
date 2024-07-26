import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, targetId, token } = req.body;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("note_id ", targetId);

    try {
        const apiResponse = await fetch(`${process.env.BASE_URL}/v1/profile/user-note-delete/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData
        });

        if (!apiResponse.ok) {
            throw new Error(`HTTP error! status: ${apiResponse.status}`);
        }

        // Parse the response as JSON
        const data = await apiResponse.json();

        // Send the response back to the client
        res.status(200).json(data);
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
