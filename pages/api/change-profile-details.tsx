import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Extract necessary data from the request body
    const reqBody = req.body;

    // Construct the form data
    const formData = new FormData();
    formData.append("email", reqBody.email);
    formData.append("username", reqBody.username);
    formData.append("firstName", reqBody.firstName);
    formData.append("phoneNumber", reqBody.phoneNumber);
    formData.append("lastName", reqBody.lastName);
    formData.append("organizationName", reqBody.organizationName);
    formData.append("location", reqBody.location);
    formData.append("birthday", reqBody.birthDate);
    formData.append("website", reqBody.website);
    formData.append("country", reqBody.country);
    formData.append("available_for_projects", reqBody.availableForProjects);
    formData.append("timezone", reqBody.timezone);

    try {
        // Make the POST request using fetch
        const apiResponse = await fetch(`${process.env.BASE_URL}/v1/profile/profile-change/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${reqBody.token}`,
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
