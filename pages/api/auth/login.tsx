import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface User {
  userId: string;
  access: string;
  refresh: string;
  isPaid: boolean;
  username: string;
  profilePicture: string;
}

function isUser(obj: any): obj is User {
  return "access" in obj && "refresh" in obj && "paid_user" in obj;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userInput =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const formdata = new FormData();
    formdata.append("email", userInput.email);
    formdata.append("password", userInput.password);
    formdata.append("locale", userInput.locale || "ru");

    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    const response = await fetch(
      `${process.env.BASE_URL}/v1/auth/token/`,
      requestOptions,
    );
    let resultJson = await response.json();
    console.log(resultJson);
    let user: User | null = null;
    resultJson.isPaid = resultJson["paid_user"];
    resultJson.profilePicture = resultJson["profile_picture"];
    if (isUser(resultJson)) {
      user = {
        userId: userInput.email,
        access: resultJson.access,
        refresh: resultJson.refresh,
        isPaid: resultJson.isPaid,
        username: resultJson.username,
        profilePicture: resultJson.profilePicture,
      };

      console.log(user);
      const token = jwt.sign(user, process.env.TOKEN_SECRET as string);
      res.setHeader("Set-Cookie", [
        `token=${token}; HttpOnly; Max-Age=${60 * 60 * 24}; Path=/; Secure`,
        `isPaid=${user.isPaid}; HttpOnly; Max-Age=${60 * 60 * 24}; Path=/; Secure`,
      ]);
      res.status(200).json({ message: "Cookie set successfully" });
    } else {
      const message =
        resultJson.error || "Login failed. Please check your credentials.";
      res.status(400).json({ message });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Login failed. Please check your credentials." });
  }
}

export default handler;
