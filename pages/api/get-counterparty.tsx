import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiUrl = `${process.env.BASE_URL}/v1/counterparty/get-company-basic/`;
    const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    try {
        const formdata = new FormData();
        formdata.append("user_type", userInput.user_type);
        formdata.append("iibn", userInput.iibn);
        formdata.append("demand_url", userInput.demand_url);

        const requestOptions: any = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };
        
        const response = await fetch(apiUrl, requestOptions)
        const responseText = await response.text();
        const responseJson = JSON.parse(responseText);
        res.status(200).json(responseJson);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }