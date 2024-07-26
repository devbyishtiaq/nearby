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
            <style>
              body { margin: 20; padding: 20px; font-size: 12px; }
              .header { font-size: 16px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="header">${title}</header>
            <div>${html}</div>
          </body>
        </html>
      `;

      await page.setContent(paddedHtml);
      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

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
