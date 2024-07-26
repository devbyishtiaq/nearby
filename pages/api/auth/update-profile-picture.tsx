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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { profilePicture } = req.body;

      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = jwt.verify(token, process.env.TOKEN_SECRET as string) as User;
      user.profilePicture = profilePicture;

      const newToken = jwt.sign(user, process.env.TOKEN_SECRET as string);
      res.setHeader("Set-Cookie", [
        `token=${newToken}; HttpOnly; Max-Age=${60 * 60 * 24}; Path=/; Secure`,
        `profilePicture=${user.profilePicture}; HttpOnly; Max-Age=${60 * 60 * 24}; Path=/; Secure`,
      ]);

      res.status(200).json({ message: "Profile picture updated in cookie successfully" });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile picture in cookie" });
  }
}

export default handler;
