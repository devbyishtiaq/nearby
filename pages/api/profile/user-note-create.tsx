import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Extract necessary data from the request body
    const { email, noteContent, noteDateTime, token } = req.body;

    // Construct the form data
    const formData = new FormData();
    formData.append("email", email);
    formData.append("note_content ", noteContent);
    formData.append("target_time ", noteDateTime);

    try {
        // Make the POST request using fetch
        const apiResponse = await fetch(`${process.env.BASE_URL}/v1/profile/user-note-create/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: formData
        });

        // Check if the request was successful
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
