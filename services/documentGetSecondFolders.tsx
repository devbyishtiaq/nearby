export const documentGetSecondFolders = async (parentFolder: string) => {
  try {
    const response = await fetch(`/api/document-get-second-folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parentFolder }),
    });
    if (!response.ok) {
      // throw new Error('Second folder not found.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Second folder not found: ", error);
    throw error;
  }
};
