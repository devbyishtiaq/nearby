import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Extract necessary data from the request body
  const { email, token, operation_type, department_id, department_name } =
    req.body;

  // Construct the form data
  const formData = new FormData();
  formData.append("email", email);
  formData.append("operation_type", operation_type);

  if (department_name) {
    formData.append("department_name", department_name);
  }

  if (department_id) {
    formData.append("department_id", department_id);
  }

  let apiUrl = `${process.env.BASE_URL}/v1/document/document-department/`;
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
