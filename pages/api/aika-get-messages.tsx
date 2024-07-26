import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiUrl = `${process.env.BASE_URL}/v1/ai-ka/chatgpt-session/`;
    const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${userInput.token}`);

        const formdata = new FormData();
        formdata.append("email", userInput.email);
        formdata.append("session_id", userInput.sessionId)

        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
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