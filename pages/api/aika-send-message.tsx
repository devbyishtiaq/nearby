import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiUrl = `${process.env.BASE_URL}/v1/ai-ka/answer-langchain/`;
    const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${userInput.token}`);
        let prompt = "";
        const query = userInput.query;
        let messages = userInput.messages;
        messages.push({"role": "user", "content": userInput.query});
        const formdata = new FormData();
        formdata.append("email", userInput.email);
        formdata.append("prompt", JSON.stringify(userInput.messages));
        formdata.append("locale", userInput.locale);
        formdata.append("session", userInput.sessionId);
        formdata.append("query", userInput.query);
        console.log(JSON.stringify(userInput.messages))
        const requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };
        
        const response = await fetch(apiUrl, requestOptions)
        const responseText = await response.text();
        const responseJson = JSON.parse(responseText);
        console.log(responseJson);
        res.status(200).json(responseJson);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }