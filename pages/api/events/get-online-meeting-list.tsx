import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let apiUrl = `${process.env.BASE_URL}/v1/events/meeting-event-list/`;
    const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const formdata = new FormData();
    formdata.append("page", userInput.page);

    try {
        const requestOptions: any = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseJson = await response.json();
        res.status(200).json(responseJson);
    } catch (error: any) {
        if (error.name === 'AbortError') {
            res.status(408).json({ message: 'Request timed out' }); // 408 Request Timeout status
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}
