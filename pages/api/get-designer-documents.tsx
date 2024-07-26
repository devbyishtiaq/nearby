import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let apiUrl = `${process.env.BASE_URL}/v1/document/parent-folder/`;
  try {
    const myHeaders = new Headers();

    const requestOptions: any = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(apiUrl, requestOptions);
    const responseText = await response.text();
    const responseJson = JSON.parse(responseText);
    res.status(200).json(responseJson.parent_folders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
