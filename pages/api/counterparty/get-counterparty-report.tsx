import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const apiUrl = `${process.env.BASE_URL}/v1/counterparty/report/${userInput.userType}/${userInput.iibnNumber}`;

    try {
        const requestOptions: any = {
            method: "GET",
        };
        
        const response = await fetch(apiUrl, requestOptions)
        const responseText = await response.text();
        const responseJson = JSON.parse(responseText);
        res.status(200).json(responseJson);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }