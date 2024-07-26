import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Extract necessary data from the request body
  const { email, token } = req.body;

  // Construct the form data
  const formData = new FormData();
  formData.append("email", email);

  let apiUrl = `${process.env.BASE_URL}/v1/document/saved-document-list/`;
  //   let apiUrl = `${process.env.BASE_URL}/v1/document/document-folder-create/`;
  try {
    const requestOptions: any = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const response = await fetch(apiUrl, requestOptions);
    const responseText = await response.text();
    const responseJson = JSON.parse(responseText);
    res.status(200).json(responseJson);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
