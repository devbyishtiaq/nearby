import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userInput = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    let apiUrl = `${process.env.BASE_URL}/v1/legislation/government-response-filter/`;
    const category = userInput.activeCategorySlug;
    const keyword = userInput.searchKeyword;
    const page = userInput.activePage;

    if (category !== null && !keyword) {
        apiUrl += `?category=${category}`;
    } else {
        apiUrl += `?`;
    }
    
    if (keyword) {
        apiUrl += `${category !== null ? '&' : ''}keyword=${keyword}`;
    }
    
    if (page) {
        apiUrl += `${category !== null || keyword ? '&' : ''}page=${page}`;
    }
    console.log(apiUrl)
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${userInput.token}`);

        const requestOptions: any = {
            method: "GET",
            headers: myHeaders,
        };
        
        const response = await fetch(apiUrl, requestOptions)
        const responseText = await response.text();
        const responseJson = JSON.parse(responseText);
        res.status(200).json(responseJson);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  }