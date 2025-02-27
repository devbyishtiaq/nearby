import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let apiUrl = `${process.env.BASE_URL}/v1/courses/course-list/`;
    const userInput = typeof req.body ==='string'? JSON.parse(req.body) : req.body;
    try {
        const formdata = new FormData();
        formdata.append("email", userInput.email);
        formdata.append("search_type", userInput.searchType);

        const requestOptions: any = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': `Token ${userInput.token}`,
            },
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