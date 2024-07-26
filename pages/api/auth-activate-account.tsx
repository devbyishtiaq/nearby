import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiUrl = `${process.env.BASE_URL}/v1/auth/activate-profile/`;
    const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    try {
        const formdata = new FormData();
        formdata.append("token", userInput.slug);
        formdata.append("locale", userInput.locale)

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