import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Extract necessary data from the request body
  const { email, token, document_id } = req.body;

  // Construct the form data
  const formData = new FormData();
  formData.append("email", email);
  formData.append("document_id", document_id);

  let apiUrl = `${process.env.BASE_URL}/v1/document/constructed-document-get-view/`;

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
