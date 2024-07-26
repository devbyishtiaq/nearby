import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let apiUrl = `${process.env.BASE_URL}/v1/legislation/legislation-search/`;
    const reqBody = req.body;
    console.log(reqBody);
    try {
        const formdata = new FormData();
        formdata.append("law_keyword", reqBody.queryText);
        formdata.append("page", reqBody.page);

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
        res.status(200).json(responseJson);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }