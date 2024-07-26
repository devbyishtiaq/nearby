import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiUrl = `${process.env.BASE_URL}/v1/api/contact-message/`;
    const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log(userInput.username, userInput.email, userInput.message_content);
    try {
        const formdata = new FormData();
        formdata.append("username", userInput.username);
        formdata.append("email", userInput.email);
        formdata.append("phone", userInput.phone);
        formdata.append("message_content", userInput.message_content);
        formdata.append("message_type", userInput.message_type);
        formdata.append("locale", userInput.locale);

        const requestOptions: any = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };
        
        const response = await fetch(apiUrl, requestOptions)
        const responseText = await response.text();
        console.log(responseText)
        const responseJson = JSON.parse(responseText); 
        res.status(200).json(responseJson);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }