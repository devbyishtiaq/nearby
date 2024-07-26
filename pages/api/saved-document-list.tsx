import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Extract necessary data from the request body
  const {
    email,
    token,
    document_type,
    search_type,
    keyword,
    parent_folder_id,
    page,
  } = req.body;

  // Construct the form data
  const formData = new FormData();
  formData.append("email", email);
  formData.append("document_type", document_type);
  formData.append("search_type", search_type);
  formData.append("page", page);
  formData.append("token", token);

  if (parent_folder_id) {
    formData.append("parent_folder_id", parent_folder_id);
  }

  if (keyword) {
    formData.append("keyword", keyword);
  }

  let apiUrl = `${process.env.BASE_URL}/v1/document/saved-document-list/`;

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
