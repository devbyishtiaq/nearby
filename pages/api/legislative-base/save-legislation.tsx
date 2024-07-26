import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let apiUrl = `${process.env.BASE_URL}/v1/legislation/legislation-save/`;
    const reqBody = req.body;
    try {
        const formdata = new FormData();
        formdata.append("email", reqBody.email);
        formdata.append("operation_type", reqBody.operationType);
        formdata.append("legislation_id", reqBody.articleId);
        formdata.append("legislation_header", reqBody.articleHeader);

        const requestOptions: any = {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': `Token ${req.body.token}`,
            },
        };
        
        const response = await fetch(apiUrl, requestOptions)
        const responseText = await response.text();
        const responseJson = JSON.parse(responseText);
        res.status(200).json(responseJson);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }