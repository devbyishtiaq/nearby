import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Extract necessary data from the request body
  const { token, folder_name, folder_type, department_id } = req.body;

  // Construct the form data
  const formData = new FormData();
  formData.append("folder_name", folder_name);
  formData.append("folder_type", folder_type);

  if (department_id) {
    formData.append("department_id", department_id);
  }

  let apiUrl = `${process.env.BASE_URL}/v1/document/document-folder-create/`;

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
