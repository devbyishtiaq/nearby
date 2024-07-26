import puppeteer from 'puppeteer';

export default async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { html, title } = req.body;

    if (!html || !title) {
      return res.status(400).send('HTML content and title are required');
    }

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const paddedHtml = `
        <html>
          <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <style>
                body {
                  font-family: "Times New Roman", Times, serif;
                }
            </style>
          </head>
          <body>
            <div style='line-height: 1.5rem;'>
                <img src="https://aika.nearby.kz/img/header/logo-nearby.png"
                    height="30" width="100" />
                <div style="margin-top: 30px; text-align: justify">${html}</div>
            </div>
          </body>
        </html>
      `;

      await page.setContent(paddedHtml);
      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true,
        margin: { top: '40px', right: '40px', bottom: '40px', left: '40px' } });

      await browser.close();

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF', error);
      res.status(500).send('Error generating PDF');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
