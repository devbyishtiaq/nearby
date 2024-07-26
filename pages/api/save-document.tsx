import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Extract necessary data from the request body
  const { email, token, folderId, documentId, documentName, fileContent } =
    req.body;

  // Construct the form data
  const formData = new FormData();
  formData.append("email", email);
  formData.append("document_title", documentName);
  formData.append("document_content", fileContent);

  if (documentId) {
    formData.append("document_id", documentId);
  } else {
    formData.append("folder_id", folderId);
  }

  let apiUrl = `${process.env.BASE_URL}/v1/document/save-document/`;

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
