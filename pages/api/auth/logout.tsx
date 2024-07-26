import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Log out request received");

    try {
        res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure');
        console.log("Cookie has been cleared");
        
        res.redirect(303, '/login');
        console.log("Redirecting to login page");
    } catch (error) {
        console.error("Failed to log out:", error);
        res.status(500).json({ message: 'Failed to log out' });
    }
}