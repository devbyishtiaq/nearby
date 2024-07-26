export default async (req: any, res: any) => {
  const { documentId } = req.query;

  if (!documentId) {
    return res.status(400).json({ error: 'Document ID is required' });
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/v1/courses/course-document-download/${documentId}/`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }

    const contentDisposition = response.headers.get('Content-Disposition');
    const contentType = response.headers.get('Content-Type');
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/"/g, '')
      : 'document';

    res.setHeader('Content-Disposition', contentDisposition);
    res.setHeader('Content-Type', contentType);

    const documentBuffer = await response.arrayBuffer();
    res.send(Buffer.from(documentBuffer));
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
};