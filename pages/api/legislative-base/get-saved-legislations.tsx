import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let apiUrl = `${process.env.BASE_URL}/v1/legislation/legislation-save/`;
    const reqBody = req.body;
    try {
        const email = reqBody.email;
        const operation_id = "3";
        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("operation_id", operation_id);
        const requestOptions: any = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': `Token ${reqBody.token}`,
            },
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