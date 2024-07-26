import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import fs from "fs";
import { writeFile } from "fs/promises";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const reqBody = req.body;
    const filePath = reqBody.file;
    console.log(req.body.email)
    const buffer = Buffer.from(await filePath.arrayBuffer());
    const filename = Date.now() + filePath.name.replaceAll(" ", "_");
    console.log(filename);

    await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
    );
    
    console.log(filePath);
    const data = new FormData();
    data.append('email', reqBody.email);
    data.append('file', fs.createReadStream(`public/uploads/${filename}`));

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.siriusai.kz/v1/profile/profile-picture-change/',
        headers: { 
            'accept': 'application/json', 
            'Authorization': `Token ${reqBody.token}`,
            ...data.getHeaders()
        },
        data: data
    };

    const response = await axios.request(config);
    console.log(response.data);
}