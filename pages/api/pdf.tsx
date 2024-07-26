// @ts-nocheck
import pdf from 'html-pdf';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt_decode from "jwt-decode";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const token = req.cookies.token || "";
    // const jwt_token: any = jwt_decode(token) as { userId: string, token: string};
    // const access_token = jwt_token["access"]
    // const reqBody = JSON.parse(req.body);
    // let htmlContentString = null;

    // if (!req.body.document_content){
    //   const formdata = new FormData();
    //   formdata.append("email", jwt_token["userId"]);
    //   formdata.append("file_id", reqBody.file_id);
    //   formdata.append("file_path", reqBody.file_path);
      
    //   const headers = {
    //     'Authorization': `Token ${access_token}`,
    //   };
      
    //   const response = await fetch(
    //       "https://api.nearby.kz/api/v1/document/download-document-profile/",
    //       {
    //         method: "POST",
    //         body: formdata,
    //         headers: headers,
    //         redirect: "follow",
    //       }
    //   );
      
    //   const htmlContent: string = await response.text();
    //   const htmlContentJson: any = await JSON.parse(htmlContent);
    //   htmlContentString = htmlContentJson["data"];
    // } else {
    //   htmlContentString = req.body.document_content;
    // }

    // Add font size to HTML content
    const htmlContentWithFontSize = `
      <html>
        <head>
          <style>
            body {
              font-size: 12px; /* Change the font size as needed */
            }
          </style>
        </head>
        <body>
          ${"Test doc"}
        </body>
      </html>
    `;

    const options = {
      format: 'Letter',
      border: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in'
      },
    };

    // Generate PDF in memory
    pdf.create(htmlContentWithFontSize, options).toBuffer((err: any, buffer: any) => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return;
      }
      
      // Send PDF as response
      res.setHeader('Content-Type', 'application/pdf');
      res.status(200).send(buffer);
    });
    
  } catch (error) {
    console.error('Error fetching HTML content:', error);
    res.status(500).end();
  }
}
