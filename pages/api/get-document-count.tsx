import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let apiUrl = `${process.env.BASE_URL}/v1/legislation/legislative-base-count/`;
    try {
        console.log(apiUrl)
        const requestOptions: any = {
            method: "POST",
            headers: {
                'Authorization': `Token ${req.body.token}`,
            },
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